'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Language } from '@/lib/i18n'
import NubeCharacter, { MiniCloud, type NubeAction } from './NubeCharacter'

interface NubeIntroProps {
  currentLanguage: Language
  onFinish: () => void
}

const COPY = {
  pt: {
    tagline: 'Ciência de Dados · IA · Automação',
    skip: 'Pular',
  },
  en: {
    tagline: 'Data Science · AI · Automation',
    skip: 'Skip',
  },
}

/**
 * Linha do tempo da abertura (ms):
 *  150   nome entra letra por letra, nuvens passam ao fundo
 *  700   Nube sobe no canto inferior direito
 *  950   nuvenzinhas do "carregando" chegam e pulam em onda ao lado dele
 *  1300  olha para elas e pisca / 2200 olha pro nome, piscada dupla
 *  3000  olha para você + pulinho
 *  3850  piscadinha
 *  4400  mergulha para fora da tela
 *  5000  a tela se fecha em círculo no canto onde ele vai reaparecer
 */
const EXIT_AT = 5000
const SEEN_KEY = 'nube-intro-seen'

// Nuvens desfocadas atravessando o fundo
const BG_CLOUDS = [
  { top: '12%', size: 340, dur: 16, delay: -4, opacity: 0.05 },
  { top: '58%', size: 460, dur: 22, delay: -12, opacity: 0.04 },
  { top: '30%', size: 260, dur: 13, delay: -8, opacity: 0.035 },
]

// Tamanhos (fração do Nube) das nuvenzinhas do "carregando"
const LOADER_CLOUDS = [0.13, 0.16, 0.19, 0.16, 0.22]

// Nuvenzinhas que flutuam perto do nome
const FLOATERS = [
  { left: '14%', top: '24%', size: 46, delay: 0.5 },
  { left: '80%', top: '18%', size: 34, delay: 0.8 },
  { left: '22%', top: '70%', size: 30, delay: 1.1 },
]

export default function NubeIntro({ currentLanguage, onFinish }: NubeIntroProps) {
  const copy = COPY[currentLanguage]
  const [visible, setVisible] = useState(true)
  const [skipped, setSkipped] = useState(false)
  const [nubeState, setNubeState] = useState<'hidden' | 'in' | 'out'>('hidden')
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(0)
  const [action, setAction] = useState<NubeAction>('idle')
  const [actionKey, setActionKey] = useState(0)
  const [size, setSize] = useState(340)

  useEffect(() => {
    // Considera largura E altura: nunca cobre o nome, nem em tela baixa nem no celular
    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const byWidth = w * (w < 640 ? 0.4 : w < 1024 ? 0.26 : 0.18)
      const byHeight = h * 0.3
      setSize(Math.round(Math.max(120, Math.min(byWidth, byHeight, 300))))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    // a abertura toca uma vez por sessão (voltar de um projeto não repete)
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {}
    if (seen) {
      setSkipped(true)
      onFinish()
      return
    }

    document.body.style.overflow = 'hidden'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const t = setTimeout(() => setVisible(false), 900)
      return () => clearTimeout(t)
    }

    const play = (a: NubeAction) => {
      setAction(a)
      setActionKey((n) => n + 1)
    }
    const steps: Array<[number, () => void]> = [
      [700, () => setNubeState('in')],
      // olha para as nuvenzinhas pulando, pisca, olha pro nome...
      [1300, () => setLook({ x: -1, y: 0.5 })],
      [1700, () => setBlink((n) => n + 1)],
      [2200, () => setLook({ x: -1, y: -0.7 })],
      [2500, () => setBlink((n) => n + 1)],
      [2720, () => setBlink((n) => n + 1)],
      // ...olha pra você, pula junto com elas e dá uma piscadinha
      [3000, () => setLook({ x: 0, y: 0 })],
      [3100, () => play('jump')],
      [3850, () => play('wink')],
      [4400, () => setNubeState('out')],
      [EXIT_AT, () => setVisible(false)],
    ]
    const timers = steps.map(([ms, fn]) => setTimeout(fn, ms))
    return () => timers.forEach(clearTimeout)
    // roda só uma vez ao montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nubeY = nubeState === 'in' ? 0 : size * 1.15
  if (skipped) return null

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
        try {
          sessionStorage.setItem(SEEN_KEY, '1')
        } catch {}
        onFinish()
      }}
    >
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] bg-background overflow-hidden"
          initial={{ clipPath: 'circle(150% at 92% 90%)' }}
          animate={{ clipPath: 'circle(150% at 92% 90%)' }}
          exit={{ clipPath: 'circle(0% at 92% 90%)' }}
          transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Fundo: brilho + nuvens desfocadas atravessando */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.06),transparent_60%)]" />
          {BG_CLOUDS.map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white blur-[60px]"
              style={{ top: c.top, width: c.size, height: c.size * 0.45, opacity: c.opacity }}
              initial={{ x: '-40vw' }}
              animate={{ x: '120vw' }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {FLOATERS.map((f, i) => (
            <motion.div
              key={i}
              className="absolute hidden sm:block"
              style={{ left: f.left, top: f.top }}
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 0.85, scale: 1, y: [20, 0, -8, 0] }}
              transition={{ delay: f.delay, duration: 3, ease: 'easeOut' }}
            >
              <MiniCloud size={f.size} />
            </motion.div>
          ))}

          {/* Nome */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            {/* mesmo estilo do nome na home: fonte, peso e cromado animado */}
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight chrome-text-animated pb-2"
              initial={{ opacity: 0, y: 24, letterSpacing: '0.08em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '-0.025em' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Lucas Leuck
            </motion.h1>
            <motion.p
              className="mt-6 text-sm sm:text-base text-dim tracking-[0.25em] uppercase font-light"
              initial={{ opacity: 0, y: 10, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
              transition={{ duration: 1.1, delay: 0.95, ease: 'easeOut' }}
            >
              {copy.tagline}
            </motion.p>
          </div>

          {/* Nube grande no canto inferior direito */}
          <div className="absolute pointer-events-none" style={{ right: '5vw', bottom: '3vh', width: size, height: size }}>
            <motion.div
              className="absolute inset-0"
              initial={{ y: size * 1.15 }}
              animate={{ y: nubeY, rotate: nubeState === 'out' ? 8 : 0 }}
              transition={
                nubeState === 'in'
                  ? { type: 'spring', stiffness: 110, damping: 12 }
                  : { duration: 0.55, ease: [0.5, -0.4, 0.75, 0.3] }
              }
            >
              <NubeCharacter
                size={size}
                look={look}
                blinkSignal={blink}
                action={action}
                actionKey={actionKey}
                autoBlink={false}
              />
            </motion.div>

            {/* "carregando": nuvenzinhas pulando em onda ao lado dele */}
            <div
              className="absolute flex items-end"
              style={{ right: size * 0.92, bottom: size * 0.1, gap: size * 0.035 }}
            >
              {LOADER_CLOUDS.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: size * 0.3, scale: 0 }}
                  animate={
                    nubeState === 'in'
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: size * 0.3, scale: 0.4 }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 16,
                    delay: nubeState === 'in' ? 0.25 + (LOADER_CLOUDS.length - 1 - i) * 0.08 : i * 0.04,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -size * 0.13, 0], scaleY: [1, 1.08, 0.9, 1], scaleX: [1, 0.94, 1.08, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut', repeatDelay: 0.25 }}
                    style={{ originY: 1 }}
                  >
                    <MiniCloud size={size * c} blink={blink % 2 === 1 && i % 2 === 0} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pular */}
          <motion.button
            onClick={() => setVisible(false)}
            className="absolute bottom-6 left-6 text-xs tracking-widest uppercase text-chrome-500 hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {copy.skip} →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
