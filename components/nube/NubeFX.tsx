'use client'

import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Language } from '@/lib/i18n'
import { MiniCloud } from './NubeCharacter'

/* ------------------------------------------------------------------ */
/* Efeitos que o Nube espalha pelo site                                */
/* ------------------------------------------------------------------ */

export type FX =
  | { id: number; type: 'bolt'; x: number; y: number; fromY: number }
  | { id: number; type: 'wind'; dir: 1 | -1 }
  | { id: number; type: 'puff'; x: number; y: number; size: number }
  | { id: number; type: 'flash' }

export const FX_DURATION: Record<FX['type'], number> = {
  bolt: 1400,
  wind: 1900,
  puff: 900,
  flash: 450,
}

/** Gera o zigue-zague de um raio entre dois pontos */
function boltPoints(x1: number, y1: number, x2: number, y2: number, seed: number) {
  let s = seed * 9301 + 49297
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const segs = 9
  const pts: Array<[number, number]> = [[x1, y1]]
  for (let i = 1; i < segs; i++) {
    const t = i / segs
    const jitter = (rnd() - 0.5) * 46 * (1 - t * 0.6)
    pts.push([x1 + (x2 - x1) * t + jitter, y1 + (y2 - y1) * t])
  }
  pts.push([x2, y2])
  // galhinho saindo do meio
  const b = pts[4]
  const branch: Array<[number, number]> = [b, [b[0] + 26, b[1] + 22], [b[0] + 18, b[1] + 46], [b[0] + 34, b[1] + 70]]
  const str = (p: Array<[number, number]>) => p.map((q) => q.join(',')).join(' ')
  return { main: str(pts), branch: str(branch) }
}

function Bolt({ fx }: { fx: Extract<FX, { type: 'bolt' }> }) {
  const { main, branch } = useMemo(() => boltPoints(fx.x, fx.fromY + 18, fx.x, fx.y, fx.id), [fx])
  const flicker = { opacity: [0, 1, 0.2, 1, 0.6, 1, 0] }
  const t = { duration: 0.9, times: [0, 0.08, 0.16, 0.26, 0.4, 0.6, 1], delay: 0.25 }
  return (
    <>
      {/* nuvem de tempestade que solta o raio */}
      <motion.div
        className="absolute"
        style={{ left: fx.x - 45, top: fx.fromY - 40 }}
        initial={{ opacity: 0, scale: 0.4, y: -20 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.1, 1, 0.9], y: [-20, 0, 0, -10], x: [0, -3, 3, 0] }}
        transition={{ duration: 1.4, times: [0, 0.15, 0.8, 1] }}
      >
        <MiniCloud size={90} tone="#4b4e58" angry />
      </motion.div>
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <motion.polyline points={main} fill="none" stroke="#9cc8ff" strokeWidth="10" strokeOpacity="0.35" strokeLinejoin="round" animate={flicker} transition={t} style={{ filter: 'blur(4px)' }} />
        <motion.polyline points={main} fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinejoin="round" animate={flicker} transition={t} />
        <motion.polyline points={branch} fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round" animate={flicker} transition={t} />
      </svg>
      {/* impacto: anel + faíscas */}
      <motion.div
        className="absolute rounded-full border-2 border-white/80"
        style={{ left: fx.x - 30, top: fx.y - 30, width: 60, height: 60 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.6], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute h-[2px] w-3 rounded-full bg-[#cfe4ff]"
            style={{ left: fx.x - 6, top: fx.y - 1, rotate: `${(a * 180) / Math.PI}deg` }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: Math.cos(a) * 46, y: Math.sin(a) * 46, opacity: [0, 1, 0] }}
            transition={{ duration: 0.55, delay: 0.32, ease: 'easeOut' }}
          />
        )
      })}
    </>
  )
}

function Wind({ fx }: { fx: Extract<FX, { type: 'wind' }> }) {
  const streaks = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        top: 6 + ((i * 37) % 88),
        w: 120 + ((i * 53) % 220),
        delay: (i % 8) * 0.09,
        dur: 0.7 + ((i * 7) % 5) * 0.08,
      })),
    [],
  )
  const from = fx.dir === 1 ? '-30vw' : '110vw'
  const to = fx.dir === 1 ? '110vw' : '-30vw'
  return (
    <>
      {streaks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] rounded-full"
          style={{
            top: `${s.top}%`,
            width: s.w,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
          }}
          initial={{ x: from, opacity: 0 }}
          animate={{ x: [from, to], opacity: [0, 0.9, 0] }}
          transition={{ duration: s.dur, delay: s.delay, ease: 'easeIn' }}
        />
      ))}
      {['🍃', '🍂', '🍃'].map((leaf, i) => (
        <motion.span
          key={`l${i}`}
          className="absolute text-xl"
          style={{ top: `${25 + i * 22}%` }}
          initial={{ x: from, opacity: 0 }}
          animate={{
            x: [from, to],
            y: [0, -40, 20, -10],
            rotate: [0, 240, 480],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 1.5, delay: 0.15 + i * 0.18, ease: 'easeInOut' }}
        >
          {leaf}
        </motion.span>
      ))}
    </>
  )
}

/** Camada fixa por cima do site onde os efeitos acontecem */
export function NubeFXLayer({ effects }: { effects: FX[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[58] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {effects.map((fx) => {
          if (fx.type === 'bolt') return <Bolt key={fx.id} fx={fx} />
          if (fx.type === 'wind') return <Wind key={fx.id} fx={fx} />
          if (fx.type === 'flash')
            return (
              <motion.div
                key={fx.id}
                className="absolute inset-0 bg-[#dbe9ff]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.16, 0, 0.1, 0] }}
                transition={{ duration: 0.45 }}
              />
            )
          return (
            <motion.div
              key={fx.id}
              className="absolute rounded-full bg-white blur-[3px]"
              style={{ left: fx.x - fx.size / 2, top: fx.y - fx.size / 2, width: fx.size, height: fx.size }}
              initial={{ opacity: 0.55, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.7, y: 6 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Nuvens de tempestade em volta do Nube bravo                         */
/* ------------------------------------------------------------------ */

const STORM = [
  { x: -84, y: -56, s: 50, d: 0 },
  { x: -20, y: -104, s: 58, d: 0.12 },
  { x: 38, y: -78, s: 44, d: 0.24 },
]

export function StormCrown({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none absolute inset-0" key="storm">
          {STORM.map((c, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ marginLeft: -c.s / 2, marginTop: -c.s / 2 }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ x: c.x, y: [c.y, c.y - 4, c.y], scale: 1, opacity: 1 }}
              exit={{ y: c.y - 30, scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: c.d }}
            >
              <motion.div animate={{ x: [0, -2, 2, -2, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
                <MiniCloud size={c.s} tone="#4b4e58" angry />
              </motion.div>
              {/* raiozinhos saindo da nuvem */}
              <motion.svg
                viewBox="0 0 20 34"
                width={c.s * 0.35}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: c.s * 0.55 }}
                animate={{ opacity: [0, 1, 0, 0, 1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.25 }}
              >
                <path d="M12 0 L2 18 H9 L6 34 L18 12 H11 Z" fill="#ffe066" stroke="#fff6c2" strokeWidth="1" />
              </motion.svg>
            </motion.div>
          ))}
          {/* 💢 de raiva */}
          <motion.span
            className="absolute -right-1 top-1 text-xl"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1, 1.2, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.8 }}
          >
            💢
          </motion.span>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/* Bandeiras (SVG, pois o Windows não mostra emoji de bandeira)        */
/* ------------------------------------------------------------------ */

export function Flag({ lang, width = 26 }: { lang: Language; width?: number }) {
  const h = Math.round(width * 0.7)
  if (lang === 'pt') {
    return (
      <svg viewBox="0 0 20 14" width={width} height={h} className="rounded-[3px] shadow-sm" aria-label="Brasil">
        <rect width="20" height="14" fill="#009c3b" />
        <path d="M10 1.6 L18.2 7 L10 12.4 L1.8 7 Z" fill="#ffdf00" />
        <circle cx="10" cy="7" r="3.1" fill="#002776" />
        <path d="M7 6.4 Q10 5.4 13 7.2" stroke="#fff" strokeWidth="0.55" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 19 10" width={width} height={h} className="rounded-[3px] shadow-sm" aria-label="USA" preserveAspectRatio="none">
      <rect width="19" height="10" fill="#fff" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={(i * 2 * 10) / 13} width="19" height={10 / 13} fill="#b22234" />
      ))}
      <rect width="7.6" height={(10 * 7) / 13} fill="#3c3b6e" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={0.9 + (i % 4) * 1.95} cy={0.8 + Math.floor(i / 4) * 1.7} r="0.35" fill="#fff" />
      ))}
    </svg>
  )
}
