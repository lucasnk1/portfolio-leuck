'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Send, X } from 'lucide-react'
import type { Language } from '@/lib/i18n'
import {
  ANOTHER_JOKE,
  QUICK_REPLIES,
  getNubeReply,
  nextJoke,
  resolveReply,
  type NubeReply,
  type ReplyRef,
} from '@/lib/nube-brain'
import NubeCharacter, { ACTION_DURATION, MiniCloud, type NubeAction, type NubeMood } from './NubeCharacter'
import { FX_DURATION, Flag, NubeFXLayer, StormCrown, type FX } from './NubeFX'

interface NubeAssistantProps {
  currentLanguage: Language
  /** Só aparece depois da abertura */
  show: boolean
}

/**
 * Mensagens guardam REFERÊNCIAS às respostas (não o texto), assim o chat
 * inteiro muda de idioma quando o visitante troca a língua do site.
 */
interface Message {
  id: number
  from: 'nube' | 'user' | 'system'
  ref?: ReplyRef
  chip?: number
  another?: boolean
  text?: string
  lang?: Language
}

type Mode = 'home' | 'roaming' | 'angry'
type Bubble =
  | { kind: 'help' }
  | { kind: 'lang'; lang: Language }
  | { kind: 'angry' }
  | { kind: 'furious' }
  | { kind: 'calm' }
  | null

type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never
type FXInput = DistOmit<FX, 'id'>

const HOVER_ACTIONS: NubeAction[] = ['jump', 'capTrick', 'wink', 'shiver', 'dance', 'wind', 'clouds']

const UI = {
  pt: {
    subtitle: 'assistente do Lucas',
    placeholder: 'Pergunte algo...',
    open: 'Abrir chat com o Nube',
    close: 'Fechar chat',
    help: 'Psiu! Posso ajudar? 👋',
    lang: 'Agora eu falo português!',
    angry: 'Ei! Para de me cutucar! 😤',
    furious: 'Chega! Agora você vai ver! ⚡',
    calm: 'Tá bom... já passou 😮‍💨',
  },
  en: {
    subtitle: "Lucas's assistant",
    placeholder: 'Ask something...',
    open: 'Open chat with Nube',
    close: 'Close chat',
    help: 'Psst! Need help? 👋',
    lang: 'Now I speak English!',
    angry: 'Hey! Stop poking me! 😤',
    furious: "That's it! Now you'll see! ⚡",
    calm: 'Okay... I calmed down 😮‍💨',
  },
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Ritmo das animações (ms) */
const PACE = {
  hoverGap: 2500, // pausa mínima entre animações de hover
  firstRoam: 30000, // primeiro passeio depois que ele aparece
  roamMin: 60000, // intervalo entre passeios
  roamMax: 100000,
  windGap: 25000, // entre rajadas de vento (ao rolar rápido)
  boltGap: 1500, // entre raios de clique duplo
  angryGap: 8000, // depois de ficar bravo
  firstStorm: 45000, // primeiro raio "do nada" depois que ele aparece
  stormMin: 75000, // intervalo entre raios espontâneos
  stormMax: 130000,
  flyBoltChance: 0.5, // chance de jogar um raio durante o voo
  hoverSpam: 5, // passadas de mouse seguidas que irritam o Nube...
  hoverSpamWindow: 4000, // ...dentro desta janela de tempo
}

/**
 * Sorteia o próximo item deixando repetir no máximo 2 vezes seguidas;
 * depois da segunda repetição, obriga a escolher outro.
 */
function pickVaried<T>(options: T[], memory: { last: T | null; streak: number }): T {
  let pool = options
  if (memory.last !== null && memory.streak >= 2) pool = options.filter((o) => o !== memory.last)
  const next = pool[Math.floor(Math.random() * pool.length)]
  memory.streak = next === memory.last ? memory.streak + 1 : 1
  memory.last = next
  return next
}

/**
 * Formatação simples das respostas do Nube:
 *  linhas com "• " viram tópicos, **texto** vira negrito, [rótulo](url) vira link
 */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-white">
              {p.slice(2, -2)}
            </strong>
          )
        }
        const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const external = /^https?:/.test(link[2])
          return (
            <a
              key={i}
              href={link[2]}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="underline decoration-white/30 underline-offset-2 hover:decoration-white text-white break-all"
            >
              {link[1]}
            </a>
          )
        }
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

const EMOJI_START = new RegExp('^(\\p{Extended_Pictographic}\\uFE0F?)\\s*', 'u')

function RichText({ text }: { text: string }) {
  const lines = text.split('\n')
  const blocks: Array<{ type: 'p' | 'ul'; items: string[] }> = []
  for (const line of lines) {
    const bullet = line.match(/^\s*[•-]\s+(.*)$/)
    if (bullet) {
      const last = blocks[blocks.length - 1]
      if (last?.type === 'ul') last.items.push(bullet[1])
      else blocks.push({ type: 'ul', items: [bullet[1]] })
    } else if (line.trim()) {
      blocks.push({ type: 'p', items: [line] })
    }
  }
  return (
    <div className="space-y-2">
      {blocks.map((b, i) =>
        b.type === 'ul' ? (
          <ul key={i} className="space-y-1.5">
            {b.items.map((it, j) => {
              // se o tópico começa com emoji, ele vira o marcador
              const emoji = it.match(EMOJI_START)
              return (
                <li key={j} className="flex gap-2">
                  {emoji ? (
                    <span className="w-5 shrink-0 text-center">{emoji[1]}</span>
                  ) : (
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-white/60" />
                  )}
                  <span>
                    <Inline text={emoji ? it.slice(emoji[0].length) : it} />
                  </span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p key={i}>
            <Inline text={b.items[0]} />
          </p>
        ),
      )}
    </div>
  )
}

/** Rajadas de vento passando pelo Nube */
function WindGust({ k }: { k: number }) {
  const streaks = [
    { top: '22%', w: 70, delay: 0 },
    { top: '40%', w: 110, delay: 0.12 },
    { top: '58%', w: 80, delay: 0.3 },
    { top: '32%', w: 60, delay: 0.55 },
    { top: '68%', w: 95, delay: 0.7 },
    { top: '48%', w: 75, delay: 0.95 },
  ]
  return (
    <div className="pointer-events-none absolute -inset-x-24 inset-y-0 overflow-visible">
      {streaks.map((s, i) => (
        <motion.span
          key={`${k}-w${i}`}
          className="absolute h-[2px] rounded-full"
          style={{
            top: s.top,
            width: s.w,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
          }}
          initial={{ left: '-10%', opacity: 0 }}
          animate={{ left: ['-10%', '110%'], opacity: [0, 1, 0] }}
          transition={{ duration: 0.75, delay: s.delay, ease: 'easeIn' }}
        />
      ))}
      {/* folhinha voando */}
      <motion.span
        key={`${k}-leaf`}
        className="absolute top-1/3 text-base"
        initial={{ left: '0%', opacity: 0, rotate: 0 }}
        animate={{ left: ['0%', '105%'], top: ['30%', '15%', '40%'], opacity: [0, 1, 1, 0], rotate: [0, 200, 420] }}
        transition={{ duration: 1.3, delay: 0.2, ease: 'easeInOut' }}
      >
        🍃
      </motion.span>
    </div>
  )
}

/** Várias nuvenzinhas amigas aparecendo em volta dele */
function CloudFriends({ k }: { k: number }) {
  const friends = [
    { x: -62, y: -34, s: 40, d: 0, tone: '#ffffff' },
    { x: 56, y: -58, s: 32, d: 0.15, tone: '#f3f4f8' },
    { x: -40, y: -86, s: 26, d: 0.3, tone: '#ffffff' },
    { x: 64, y: -10, s: 36, d: 0.45, tone: '#eceef4' },
    { x: 4, y: -104, s: 30, d: 0.6, tone: '#ffffff' },
  ]
  return (
    <div className="pointer-events-none absolute inset-0">
      {friends.map((f, i) => (
        <motion.div
          key={`${k}-c${i}`}
          className="absolute left-1/2 top-1/2"
          style={{ marginLeft: -f.s / 2, marginTop: -f.s / 2 }}
          initial={{ x: 0, y: 10, scale: 0, opacity: 0 }}
          animate={{
            x: [0, f.x, f.x + 4, f.x - 3, f.x],
            y: [10, f.y, f.y - 6, f.y + 2, f.y - 14],
            scale: [0, 1.15, 1, 1, 0.6],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 1.7, delay: f.d * 0.6, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeOut' }}
        >
          <MiniCloud size={f.s} tone={f.tone} />
        </motion.div>
      ))}
    </div>
  )
}

/** Partículas que acompanham cada animação de hover */
function Particles({ action, k }: { action: NubeAction; k: number }) {
  if (action === 'wind') return <WindGust k={k} />
  if (action === 'clouds') return <CloudFriends k={k} />
  const items: Array<{ c: string; x: number; delay: number; size: number }> = []
  if (action === 'wink') {
    ;[-22, 0, 22].forEach((x, i) => items.push({ c: '♥', x, delay: 0.2 + i * 0.12, size: 14 + i * 2 }))
  } else if (action === 'dance') {
    ;['♪', '♫', '♪', '♬'].forEach((c, i) => items.push({ c, x: i % 2 ? 34 : -34, delay: i * 0.3, size: 16 }))
  } else if (action === 'shiver') {
    ;['✦', '✧', '✦', '✧'].forEach((c, i) => items.push({ c, x: [-36, 36, -28, 30][i], delay: i * 0.1, size: 12 }))
  } else if (action === 'jump') {
    ;[-30, 30].forEach((x, i) => items.push({ c: '•', x, delay: 0.55 + i * 0.02, size: 18 }))
  } else if (action === 'capTrick') {
    items.push({ c: '✨', x: 30, delay: 0.95, size: 16 })
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((p, i) => (
        <motion.span
          key={`${k}-${i}`}
          className="absolute left-1/2 top-1/3 text-white/90 select-none"
          style={{ fontSize: p.size, textShadow: '0 0 8px rgba(255,255,255,0.6)' }}
          initial={{ opacity: 0, x: p.x * 0.4, y: 0, scale: 0.4 }}
          animate={
            action === 'jump'
              ? { opacity: [0, 0.7, 0], x: p.x * 1.6, y: 48, scale: [0.6, 1.4, 1.8] }
              : { opacity: [0, 1, 0], x: p.x, y: -52 - i * 6, scale: [0.4, 1.1, 0.9] }
          }
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        >
          {p.c}
        </motion.span>
      ))}
    </div>
  )
}

export default function NubeAssistant({ currentLanguage, show }: NubeAssistantProps) {
  const ui = UI[currentLanguage]
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<NubeAction>('idle')
  const [actionKey, setActionKey] = useState(0)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [mood, setMood] = useState<NubeMood>('normal')
  const [mode, setModeState] = useState<Mode>('home')
  const [bubble, setBubble] = useState<Bubble>(null)
  const [effects, setEffects] = useState<FX[]>([])
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'nube', ref: { kind: 'greeting' } }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const busy = useRef(false)
  const lastAction = useRef<NubeAction>('idle')
  const modeRef = useRef<Mode>('home')
  const openRef = useRef(false)
  const hovering = useRef(false)
  const reduced = useRef(false)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>()
  const fxId = useRef(1)
  const nubeRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)
  const flight = useAnimationControls()
  const abortRoam = useRef(false)
  const openAfterRoam = useRef(false)
  const nubeClicks = useRef<number[]>([])

  const setMode = (m: Mode) => {
    modeRef.current = m
    setModeState(m)
  }

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  /* ---------------- utilidades ---------------- */

  const addFX = useCallback((fx: FXInput) => {
    const id = fxId.current++
    setEffects((list) => [...list, { ...fx, id } as FX])
    setTimeout(() => setEffects((list) => list.filter((e) => e.id !== id)), FX_DURATION[fx.type] + 200)
  }, [])

  const showBubble = useCallback((b: Bubble, ms: number) => {
    clearTimeout(bubbleTimer.current)
    setBubble(b)
    bubbleTimer.current = setTimeout(() => setBubble(null), ms)
  }, [])

  const lastActionEnd = useRef(0)
  const hoverMemory = useRef<{ last: NubeAction | null; streak: number }>({ last: null, streak: 0 })
  const roamMemory = useRef<{ last: 'fly' | 'walk' | null; streak: number }>({ last: null, streak: 0 })
  const lastAngryEnd = useRef(0)

  const play = useCallback((a: NubeAction, force = false) => {
    if (busy.current && !force) return
    lastAction.current = a
    busy.current = true
    setAction(a)
    setActionKey((n) => n + 1)
    setTimeout(() => {
      busy.current = false
      lastActionEnd.current = performance.now()
      setAction('idle')
    }, ACTION_DURATION[a] + 150)
  }, [])

  const nubeCenter = () => {
    const r = nubeRef.current?.getBoundingClientRect()
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2, bottom: r.bottom } : { x: 0, y: 0, bottom: 0 }
  }

  /* ---------------- arrastar as sugestões ---------------- */

  const chipsRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: false })
  const onChipsDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !chipsRef.current) return
    drag.current = { down: true, startX: e.clientX, scroll: chipsRef.current.scrollLeft, moved: false }
  }
  const onChipsMove = (e: ReactPointerEvent) => {
    const d = drag.current
    if (!d.down || !chipsRef.current) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 4) d.moved = true
    chipsRef.current.scrollLeft = d.scroll - dx
  }
  const onChipsUp = () => {
    drag.current.down = false
  }

  useEffect(() => {
    const el = chipsRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  /* ---------------- olhos seguem o cursor ---------------- */

  useEffect(() => {
    if (!show) return
    const onMove = (e: MouseEvent) => {
      if (modeRef.current === 'roaming') return
      const c = nubeCenter()
      setLook({ x: (e.clientX - c.x) / 300, y: (e.clientY - c.y) / 300 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [show])

  /* ---------------- balão de "posso ajudar?" ---------------- */

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => showBubble({ kind: 'help' }, 5700), 1800)
    return () => clearTimeout(t)
  }, [show, showBubble])

  /* ---------------- troca de idioma ---------------- */

  const prevLang = useRef(currentLanguage)
  useEffect(() => {
    if (prevLang.current === currentLanguage) return
    prevLang.current = currentLanguage
    showBubble({ kind: 'lang', lang: currentLanguage }, 3400)
    if (modeRef.current === 'home') play('capTrick', true)
    // aviso dentro do chat (as mensagens antigas já se traduzem sozinhas)
    setMessages((m) => (m.length > 1 ? [...m, { id: nextId.current++, from: 'system', lang: currentLanguage }] : m))
  }, [currentLanguage, play, showBubble])

  /* ---------------- chat ---------------- */

  // outras partes do site podem pedir para abrir o chat (ex.: card do projeto Nube)
  useEffect(() => {
    if (!show) return
    const onOpen = () => {
      if (modeRef.current === 'roaming') {
        abortRoam.current = true
        openAfterRoam.current = true
        return
      }
      if (modeRef.current === 'angry') return
      setBubble(null)
      setOpen(true)
    }
    window.addEventListener('nube:open', onOpen)
    return () => window.removeEventListener('nube:open', onOpen)
  }, [show])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!open) return
    setTimeout(() => inputRef.current?.focus(), 250)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = (q: { text?: string; chip?: number; another?: boolean }) => {
    if (typing) return
    const text = q.chip !== undefined ? QUICK_REPLIES[currentLanguage][q.chip] : q.another ? ANOTHER_JOKE[currentLanguage] : q.text?.trim()
    if (!text) return
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', chip: q.chip, another: q.another, text: q.text?.trim() }])
    setInput('')
    setTyping(true)
    const ref = q.another ? nextJoke() : getNubeReply(text)
    const length = resolveReply(ref, currentLanguage).text.length
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { id: nextId.current++, from: 'nube', ref }])
    }, 550 + Math.min(1100, length * 5))
  }

  const runAction = (a: NonNullable<NubeReply['action']>) => {
    if (a.send === 'another-joke') {
      send({ another: true })
      return
    }
    if (a.href) {
      window.open(a.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (a.scrollTo) {
      const el = document.getElementById(a.scrollTo)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
      if (window.innerWidth < 640) setOpen(false)
    }
  }

  /* ---------------- bravo: tempestade com trovões ---------------- */

  const triggerAngry = useCallback(() => {
    if (modeRef.current !== 'home' || reduced.current) return
    if (performance.now() - lastAngryEnd.current < PACE.angryGap) return
    setOpen(false)
    setMode('angry')
    setMood('angry')
    play('rage', true)
    showBubble({ kind: 'angry' }, 2500)
    const strike = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const x = rand(w * 0.1, w * 0.9)
      const y = rand(h * 0.35, h * 0.85)
      addFX({ type: 'bolt', x, y, fromY: Math.max(30, y - rand(200, 320)) })
      addFX({ type: 'flash' })
    }
    ;[350, 1050, 1750].forEach((ms) => setTimeout(strike, ms))
    setTimeout(() => {
      setMood('normal')
      showBubble({ kind: 'calm' }, 2200)
    }, 2700)
    setTimeout(() => {
      lastAngryEnd.current = performance.now()
      setMode('home')
    }, 3100)
  }, [addFX, play, showBubble])

  /* ---------------- irritado com tanto hover: vai pro meio da tela e solta um raio ---------------- */

  const hoverTimes = useRef<number[]>([])
  const triggerFurious = useCallback(async () => {
    if (modeRef.current !== 'home' || reduced.current) return
    if (performance.now() - lastAngryEnd.current < PACE.angryGap) return
    setOpen(false)
    setMode('angry')
    setMood('angry')
    showBubble({ kind: 'furious' }, 2600)

    // voa bravo até o centro da tela
    const home = nubeCenter()
    const w = window.innerWidth
    const h = window.innerHeight
    setLook({ x: -0.4, y: -0.6 })
    await flight.start(
      { x: w / 2 - home.x, y: h / 2 - home.y, scale: 1.45, rotate: [0, -8, 6, 0] },
      { duration: 0.9, ease: [0.6, 0, 0.3, 1] },
    )

    // treme de raiva...
    play('rage', true)
    await wait(1100)

    // ...e solta o raio lá embaixo, com dois clarões
    const c = nubeCenter()
    setLook({ x: 0, y: 1 })
    addFX({ type: 'bolt', x: c.x, y: Math.min(h - 30, c.y + rand(220, 300)), fromY: c.y + 20 })
    addFX({ type: 'flash' })
    setTimeout(() => addFX({ type: 'flash' }), 260)
    await wait(1400)

    // se acalma e volta pro canto
    setMood('normal')
    showBubble({ kind: 'calm' }, 2200)
    setLook({ x: 1, y: 0.4 })
    await flight.start({ x: 0, y: 0, scale: 1, rotate: 0 }, { duration: 1.1, ease: 'easeInOut' })
    setLook({ x: 0, y: 0 })
    lastAngryEnd.current = performance.now()
    setMode('home')
  }, [addFX, flight, play, showBubble])

  /* ---------------- passear / voar pelo site ---------------- */

  const startRoam = useCallback(async () => {
    if (modeRef.current !== 'home' || openRef.current || hovering.current || document.hidden || reduced.current) return
    setMode('roaming')
    setBubble(null)
    abortRoam.current = false
    const home = nubeCenter()
    const w = window.innerWidth
    const h = window.innerHeight
    const kind = pickVaried<'fly' | 'walk'>(['fly', 'walk'], roamMemory.current)

    if (kind === 'fly') {
      // rastro de nuvenzinha enquanto voa
      const trail = setInterval(() => {
        const c = nubeCenter()
        addFX({ type: 'puff', x: c.x + rand(-8, 8), y: c.y + 26, size: rand(16, 28) })
      }, 120)
      let prevX = 0
      const stops = Array.from({ length: 3 }, () => ({ x: rand(90, w - 90), y: rand(110, h * 0.7) }))
      for (const p of stops) {
        if (abortRoam.current) break
        const dx = p.x - home.x
        const dy = p.y - home.y
        const dir = Math.sign(dx - prevX) || 1
        setLook({ x: dir, y: 0.2 })
        await flight.start(
          { x: dx, y: dy, rotate: dir * 10, scale: 0.92 },
          { duration: rand(1.2, 1.7), ease: 'easeInOut' },
        )
        prevX = dx
        if (abortRoam.current) break
        // no meio do voo ele joga um raio lá embaixo
        if (p === stops[1] && Math.random() < PACE.flyBoltChance) {
          const c = nubeCenter()
          const y = Math.min(h - 40, c.y + rand(160, 260))
          addFX({ type: 'bolt', x: c.x + rand(-40, 40), y, fromY: c.y + 30 })
          addFX({ type: 'flash' })
        }
        // dá uma olhadinha no site
        setLook({ x: -dir * 0.6, y: 0.8 })
        await flight.start({ rotate: 0, y: dy - 10 }, { duration: 0.45 })
      }
      setLook({ x: 1, y: 0.4 })
      await flight.start({ x: 0, y: 0, rotate: 0, scale: 1 }, { duration: 1.3, ease: 'easeInOut' })
      clearInterval(trail)
    } else {
      // passeio pulando pelo rodapé da tela
      const total = -Math.min(w - 200, 640)
      const hops = 6
      const step = total / hops
      setLook({ x: -1, y: 0 })
      let i = 1
      for (; i <= hops && !abortRoam.current; i++) {
        await flight.start({ x: step * i, y: [0, -30, 0], rotate: [0, -7, 0] }, { duration: 0.42, ease: 'easeOut' })
        const c = nubeCenter()
        addFX({ type: 'puff', x: c.x, y: c.bottom - 6, size: 18 })
      }
      if (!abortRoam.current) {
        setLook({ x: -0.6, y: -0.8 })
        await wait(600)
        setLook({ x: 1, y: 0 })
        await wait(400)
      }
      for (let j = i - 2; j >= 0; j--) {
        await flight.start({ x: step * j, y: [0, -30, 0], rotate: [0, 7, 0] }, { duration: 0.42, ease: 'easeOut' })
        const c = nubeCenter()
        addFX({ type: 'puff', x: c.x, y: c.bottom - 6, size: 18 })
      }
    }

    setLook({ x: 0, y: 0 })
    setMode('home')
    if (openAfterRoam.current) {
      openAfterRoam.current = false
      setOpen(true)
    }
  }, [addFX, flight])

  // agenda os passeios: primeiro ~15s depois de aparecer, depois a cada 30–55s
  const startRoamRef = useRef(startRoam)
  startRoamRef.current = startRoam
  useEffect(() => {
    if (!show) return
    // atalho só em desenvolvimento: window.__nubeRoam() no console
    if (process.env.NODE_ENV !== 'production') {
      ;(window as unknown as { __nubeRoam?: () => void }).__nubeRoam = () => {
        hovering.current = false
        startRoamRef.current()
      }
    }
    let timer: ReturnType<typeof setTimeout>
    let alive = true
    const schedule = (ms: number) => {
      timer = setTimeout(async () => {
        await startRoamRef.current()
        if (alive) schedule(rand(PACE.roamMin, PACE.roamMax))
      }, ms)
    }
    schedule(PACE.firstRoam)
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [show])

  /* ---------------- raios espontâneos ---------------- */

  // de tempos em tempos o Nube joga um raio em algum lugar do site
  useEffect(() => {
    if (!show) return
    let timer: ReturnType<typeof setTimeout>
    const strike = () => {
      if (modeRef.current === 'home' && !openRef.current && !document.hidden && !reduced.current) {
        const w = window.innerWidth
        const h = window.innerHeight
        const x = rand(w * 0.12, w * 0.8)
        const y = rand(h * 0.3, h * 0.8)
        const c = nubeCenter()
        setLook({ x: (x - c.x) / 300, y: (y - c.y) / 300 })
        play('jump', true)
        addFX({ type: 'bolt', x, y, fromY: Math.max(30, y - rand(200, 300)) })
        addFX({ type: 'flash' })
      }
      timer = setTimeout(strike, rand(PACE.stormMin, PACE.stormMax))
    }
    timer = setTimeout(strike, PACE.firstStorm)
    return () => clearTimeout(timer)
  }, [show, addFX, play])

  /* ---------------- interações com o site ---------------- */

  useEffect(() => {
    if (!show) return
    let clicks: number[] = []
    let lastBolt = 0
    let lastWind = 0
    let anchor = { t: performance.now(), y: window.scrollY }

    const ignore = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest('[role=dialog], input, textarea, [data-nube]')

    // muitos cliques seguidos = Nube fica bravo
    const onClick = () => {
      const now = performance.now()
      clicks = clicks.filter((t) => now - t < 900)
      clicks.push(now)
      if (clicks.length >= 5) {
        clicks = []
        triggerAngry()
      }
    }

    // clique duplo = Nube joga um raio onde você clicou
    const onDouble = (e: MouseEvent) => {
      if (ignore(e.target) || modeRef.current !== 'home' || reduced.current) return
      const now = performance.now()
      if (now - lastBolt < PACE.boltGap) return
      lastBolt = now
      window.getSelection()?.removeAllRanges()
      const c = nubeCenter()
      setLook({ x: (e.clientX - c.x) / 300, y: (e.clientY - c.y) / 300 })
      play('jump', true)
      addFX({ type: 'bolt', x: e.clientX, y: e.clientY, fromY: Math.max(24, e.clientY - 260) })
      addFX({ type: 'flash' })
    }

    // rolar rápido = rajada de vento pela tela
    const onScroll = () => {
      const now = performance.now()
      const dt = now - anchor.t
      if (dt < 90) return
      const dy = window.scrollY - anchor.y
      anchor = { t: now, y: window.scrollY }
      if (Math.abs(dy) / dt < 3 || now - lastWind < PACE.windGap) return
      if (modeRef.current !== 'home' || reduced.current) return
      lastWind = now
      // o vento sempre sopra da esquerda para a direita
      addFX({ type: 'wind', dir: 1 })
      play('wind', true)
    }

    document.addEventListener('click', onClick)
    document.addEventListener('dblclick', onDouble)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('dblclick', onDouble)
      window.removeEventListener('scroll', onScroll)
    }
  }, [show, addFX, play, triggerAngry])

  const onNubeClick = () => {
    // cutucou 3x rapidinho? fica bravo
    const now = performance.now()
    nubeClicks.current = nubeClicks.current.filter((t) => now - t < 1000)
    nubeClicks.current.push(now)
    if (nubeClicks.current.length >= 3) {
      nubeClicks.current = []
      triggerAngry()
      return
    }
    if (modeRef.current === 'roaming') {
      // volta pra casa e abre o chat
      abortRoam.current = true
      openAfterRoam.current = true
      return
    }
    if (modeRef.current === 'angry') return
    setOpen((o) => !o)
    setBubble(null)
  }

  /* ---------------- render ---------------- */

  const userText = (m: Message) =>
    m.chip !== undefined ? QUICK_REPLIES[currentLanguage][m.chip] : m.another ? ANOTHER_JOKE[currentLanguage] : m.text

  return (
    <>
      <NubeFXLayer effects={effects} />

      {/* Janela do chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            role="dialog"
            aria-label="Nube"
            className="fixed z-[60] right-4 sm:right-6 bottom-[7.5rem] w-[calc(100vw-2rem)] sm:w-[360px] h-[min(480px,calc(100vh-10rem))] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-chrome-950/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{ transformOrigin: 'bottom right' }}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            {/* Cabeçalho */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center overflow-hidden">
                <NubeCharacter size={40} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-foreground leading-tight">Nube</p>
                <p className="text-xs text-dim flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {ui.subtitle}
                </p>
              </div>
              <Flag lang={currentLanguage} width={22} />
              <button
                onClick={() => setOpen(false)}
                aria-label={ui.close}
                className="p-2 rounded-lg text-dim hover:text-foreground hover:bg-white/[0.06] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mensagens */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => {
                if (m.from === 'system') {
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-dim">
                        <Flag lang={m.lang!} width={18} />
                        {UI[m.lang!].lang}
                      </span>
                    </motion.div>
                  )
                }
                const reply = m.from === 'nube' && m.ref ? resolveReply(m.ref, currentLanguage) : null
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                        m.from === 'user'
                          ? 'bg-gradient-to-br from-white to-chrome-300 text-background rounded-br-md'
                          : 'bg-white/[0.06] text-foreground border border-white/[0.06] rounded-bl-md'
                      }`}
                    >
                      {reply ? <RichText text={reply.text} /> : userText(m)}
                      {reply?.action && (
                        <button
                          onClick={() => runAction(reply.action!)}
                          className="mt-2 block text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                        >
                          {reply.action.label} →
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.06] flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-dim"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sugestões rápidas */}
            <div
              ref={chipsRef}
              onPointerDown={onChipsDown}
              onPointerMove={onChipsMove}
              onPointerUp={onChipsUp}
              onPointerLeave={onChipsUp}
              onClickCapture={(e) => {
                // não dispara o clique se o usuário estava arrastando
                if (drag.current.moved) {
                  e.stopPropagation()
                  e.preventDefault()
                  drag.current.moved = false
                }
              }}
              className="chips-fade px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none touch-pan-x"
            >
              {QUICK_REPLIES[currentLanguage].map((q, i) => (
                <button
                  key={q}
                  onClick={() => send({ chip: i })}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 text-dim hover:text-foreground hover:border-white/25 hover:bg-white/[0.04] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Campo de texto */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send({ text: input })
              }}
              className="flex items-center gap-2 p-3 border-t border-white/[0.06]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ui.placeholder}
                maxLength={300}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-chrome-500 outline-none focus:border-white/25 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Enviar"
                className="p-2.5 rounded-xl bg-gradient-to-br from-white to-chrome-300 text-background disabled:opacity-30 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nube no canto */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="nube-corner"
            data-nube
            className="fixed z-[60] right-3 sm:right-5 bottom-3 sm:bottom-4"
            initial={{ y: 160, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 160, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.25 }}
          >
            {/* esta camada é a que voa/passeia pelo site */}
            <motion.div animate={flight} style={{ originX: 0.5, originY: 1 }}>
              <AnimatePresence mode="wait">
                {bubble && !(open && bubble.kind === 'help') && (
                  <motion.div
                    key={bubble.kind}
                    className="absolute z-10 bottom-[calc(100%-4px)] right-4 flex items-center gap-2 whitespace-nowrap text-xs font-semibold px-3 py-2 rounded-xl rounded-br-sm bg-white text-background shadow-lg"
                    initial={{ opacity: 0, y: 6, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    style={{ originX: 1, originY: 1 }}
                  >
                    {bubble.kind === 'lang' ? (
                      <>
                        <Flag lang={bubble.lang} />
                        {UI[bubble.lang].lang}
                      </>
                    ) : (
                      ui[bubble.kind]
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                ref={nubeRef}
                onMouseEnter={() => {
                  hovering.current = true
                  // muitas passadas de mouse seguidas = ele se irrita
                  const now = performance.now()
                  hoverTimes.current = hoverTimes.current.filter((t) => now - t < PACE.hoverSpamWindow)
                  hoverTimes.current.push(now)
                  if (hoverTimes.current.length >= PACE.hoverSpam && modeRef.current === 'home') {
                    hoverTimes.current = []
                    triggerFurious()
                    return
                  }
                  const rested = now - lastActionEnd.current > PACE.hoverGap
                  if (modeRef.current === 'home' && !busy.current && rested) {
                    play(pickVaried(HOVER_ACTIONS, hoverMemory.current))
                  }
                }}
                onMouseLeave={() => {
                  hovering.current = false
                }}
                onClick={onNubeClick}
                aria-label={open ? ui.close : ui.open}
                aria-expanded={open}
                className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
              >
                <StormCrown active={mode === 'angry'} />
                <Particles action={lastAction.current} k={actionKey} />
                <NubeCharacter
                  size={112}
                  action={action}
                  actionKey={actionKey}
                  look={look}
                  mood={mood}
                  className="w-full h-full"
                />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
