'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import type { Language } from '@/lib/i18n'
import { GREETING, QUICK_REPLIES, getNubeReply, type NubeReply } from '@/lib/nube-brain'
import NubeCharacter, { ACTION_DURATION, MiniCloud, type NubeAction } from './NubeCharacter'

interface NubeAssistantProps {
  currentLanguage: Language
  /** Só aparece depois da abertura */
  show: boolean
}

interface Message {
  id: number
  from: 'nube' | 'user'
  text: string
  action?: NubeReply['action']
}

const HOVER_ACTIONS: NubeAction[] = ['jump', 'capTrick', 'wink', 'shiver', 'dance', 'wind', 'clouds']

const UI = {
  pt: {
    subtitle: 'assistente do Lucas',
    placeholder: 'Pergunte algo...',
    open: 'Abrir chat com o Nube',
    close: 'Fechar chat',
    bubble: 'Psiu! Posso ajudar? 👋',
  },
  en: {
    subtitle: "Lucas's assistant",
    placeholder: 'Ask something...',
    open: 'Open chat with Nube',
    close: 'Close chat',
    bubble: 'Psst! Need help? 👋',
  },
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
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const busy = useRef(false)
  const lastAction = useRef<NubeAction>('idle')
  const nubeRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  // Arrastar as sugestões com o mouse (no celular o toque já rola)
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

  // Roda do mouse rola as sugestões na horizontal
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

  // Olhos seguem o cursor
  useEffect(() => {
    if (!show) return
    const onMove = (e: MouseEvent) => {
      const el = nubeRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      setLook({ x: dx / 300, y: dy / 300 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [show])

  // Balãozinho de "posso ajudar?" um tempo depois de aparecer
  useEffect(() => {
    if (!show) return
    const a = setTimeout(() => setShowBubble(true), 1800)
    const b = setTimeout(() => setShowBubble(false), 7500)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [show])

  // Mensagem de boas-vindas (e troca de idioma)
  useEffect(() => {
    setMessages((prev) =>
      prev.length <= 1 ? [{ id: 0, from: 'nube', text: GREETING[currentLanguage] }] : prev,
    )
  }, [currentLanguage])

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

  const playRandom = useCallback(() => {
    if (busy.current) return
    const options = HOVER_ACTIONS.filter((a) => a !== lastAction.current)
    const next = options[Math.floor(Math.random() * options.length)]
    lastAction.current = next
    busy.current = true
    setAction(next)
    setActionKey((n) => n + 1)
    setTimeout(() => {
      busy.current = false
      setAction('idle')
    }, ACTION_DURATION[next] + 150)
  }, [])

  const send = (text: string) => {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    const reply = getNubeReply(clean, currentLanguage)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { id: nextId.current++, from: 'nube', text: reply.text, action: reply.action }])
    }, 550 + Math.min(1100, reply.text.length * 5))
  }

  const runAction = (a: NonNullable<Message['action']>) => {
    if (a.send) {
      send(a.send)
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

  return (
    <>
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
              {messages.map((m) => (
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
                    {m.from === 'nube' ? <RichText text={m.text} /> : m.text}
                    {m.action && (
                      <button
                        onClick={() => runAction(m.action!)}
                        className="mt-2 block text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                      >
                        {m.action.label} →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
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
              {QUICK_REPLIES[currentLanguage].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
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
                send(input)
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
            className="fixed z-[60] right-3 sm:right-5 bottom-3 sm:bottom-4"
            initial={{ y: 160, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 160, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.25 }}
          >
            <AnimatePresence>
              {showBubble && !open && (
                <motion.div
                  className="absolute bottom-[calc(100%-4px)] right-4 whitespace-nowrap text-xs font-medium px-3 py-2 rounded-xl rounded-br-sm bg-white text-background shadow-lg"
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.8 }}
                >
                  {ui.bubble}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              ref={nubeRef}
              onMouseEnter={playRandom}
              onFocus={playRandom}
              onClick={() => {
                setOpen((o) => !o)
                setShowBubble(false)
              }}
              aria-label={open ? ui.close : ui.open}
              aria-expanded={open}
              className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
            >
              <Particles action={lastAction.current} k={actionKey} />
              <NubeCharacter
                size={112}
                action={action}
                actionKey={actionKey}
                look={look}
                className="w-full h-full"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
