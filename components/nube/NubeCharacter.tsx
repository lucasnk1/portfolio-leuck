'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { motion, type TargetAndTransition } from 'framer-motion'

export type NubeAction = 'idle' | 'jump' | 'capTrick' | 'wink' | 'shiver' | 'dance' | 'wind' | 'clouds'

interface NubeCharacterProps {
  /** Largura em px (a altura é igual). */
  size: number
  /** Animação atual. Mude `actionKey` para repetir a mesma animação. */
  action?: NubeAction
  actionKey?: number
  /** Para onde os olhos olham, de -1 a 1 em cada eixo. */
  look?: { x: number; y: number }
  /** Pisca sozinho de tempos em tempos. */
  autoBlink?: boolean
  /** Incremente para forçar uma piscada. */
  blinkSignal?: number
  className?: string
}

// O framer-motion calcula a origem a partir do bbox do elemento SVG
const BOTTOM = { originX: 0.5, originY: 1 } as const
const CENTER = { originX: 0.5, originY: 0.5 } as const
const TOP_CENTER = { originX: 0.5, originY: 0 } as const

const BODY =
  'M36 176 C14 176 10 140 30 124 C30 82 58 46 100 46 C142 46 170 82 170 124 C190 140 186 176 164 176 Q132 184 100 177 Q68 184 36 176 Z'

const CROWN = 'M28 104 C22 56 58 20 100 20 C142 20 178 56 172 104 Q100 92 28 104 Z'
const BRIM = 'M20 100 Q100 84 180 100 Q190 114 172 119 Q100 106 28 119 Q10 114 20 100 Z'

/**
 * Textura de pelúcia: milhares de fiozinhos curtos desenhados uma vez num
 * canvas (tile que se repete sem emenda). Bem mais leve que filtros SVG.
 */
let furCache: string | null = null
function makeFurTexture(): string {
  if (furCache) return furCache
  const S = 128
  const c = document.createElement('canvas')
  c.width = c.height = S
  const ctx = c.getContext('2d')
  if (!ctx) return ''
  let seed = 42
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  ctx.lineCap = 'round'
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * S
    const y = rnd() * S
    const len = 3 + rnd() * 5
    const a = -Math.PI / 2 + (rnd() - 0.5) * 2.2
    const dark = rnd() < 0.5
    ctx.strokeStyle = dark ? `rgba(120,124,138,${0.1 + rnd() * 0.14})` : `rgba(255,255,255,${0.35 + rnd() * 0.4})`
    ctx.lineWidth = 0.7 + rnd() * 0.8
    // desenha também nas bordas opostas para o tile não ter emenda
    for (const ox of [-S, 0, S]) {
      for (const oy of [-S, 0, S]) {
        const sx = x + ox
        const sy = y + oy
        if (sx < -10 || sx > S + 10 || sy < -10 || sy > S + 10) continue
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(sx + Math.cos(a) * len, sy + Math.sin(a) * len)
        ctx.stroke()
      }
    }
  }
  furCache = c.toDataURL('image/png')
  return furCache
}

// Curva da corrente (bezier quadrática)
const CHAIN = { p0: [30, 146], c: [100, 198], p2: [170, 146] } as const

export const ACTION_DURATION: Record<NubeAction, number> = {
  idle: 0,
  jump: 950,
  capTrick: 1300,
  wink: 1200,
  shiver: 1000,
  dance: 1400,
  wind: 1700,
  clouds: 2000,
}

function bodyAnim(action: NubeAction): TargetAndTransition {
  switch (action) {
    case 'jump':
      return {
        y: [0, 6, -46, 0, 5, 0],
        scaleX: [1, 1.14, 0.9, 1.08, 0.97, 1],
        scaleY: [1, 0.84, 1.12, 0.9, 1.03, 1],
        transition: { duration: 0.95, times: [0, 0.18, 0.45, 0.7, 0.85, 1], ease: 'easeOut' },
      }
    case 'capTrick':
      return {
        y: [0, 4, 0, 0, 5, 0],
        scaleX: [1, 1.08, 1, 1, 1.1, 1],
        scaleY: [1, 0.92, 1, 1, 0.9, 1],
        transition: { duration: 1.3, times: [0, 0.12, 0.25, 0.75, 0.86, 1] },
      }
    case 'wink':
      return { rotate: [0, 9, 9, 0], transition: { duration: 1.2, times: [0, 0.2, 0.8, 1] } }
    case 'shiver':
      return {
        x: [0, -4, 4, -4, 4, -3, 3, -2, 2, 0],
        scale: [1, 1.08, 1.1, 1.1, 1.1, 1.1, 1.1, 1.08, 1.04, 1],
        transition: { duration: 1, ease: 'linear' },
      }
    case 'dance':
      return {
        rotate: [0, -12, 12, -12, 12, 0],
        y: [0, -10, 0, -10, 0, 0],
        transition: { duration: 1.4, ease: 'easeInOut' },
      }
    case 'wind':
      // vento da esquerda: ele se inclina e resiste
      return {
        skewX: [0, -14, -9, -16, -10, -14, 0],
        x: [0, 5, 3, 6, 3, 5, 0],
        scaleY: [1, 0.95, 0.97, 0.94, 0.97, 0.95, 1],
        transition: { duration: 1.7, ease: 'easeInOut' },
      }
    case 'clouds':
      return {
        y: [0, -10, 0, -6, 0, -4, 0],
        scaleX: [1, 0.96, 1.05, 0.98, 1.03, 1, 1],
        scaleY: [1, 1.05, 0.95, 1.02, 0.97, 1, 1],
        transition: { duration: 2, ease: 'easeInOut' },
      }
    default:
      return { x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1, scaleY: 1, skewX: 0 }
  }
}

function capAnim(action: NubeAction): TargetAndTransition {
  switch (action) {
    case 'jump':
      return {
        y: [0, 0, -24, 0, 0, 0],
        rotate: [0, 0, -10, 4, 0, 0],
        transition: { duration: 0.95, times: [0, 0.18, 0.5, 0.75, 0.88, 1] },
      }
    case 'capTrick':
      return {
        y: [0, 0, -95, -95, 0, 0],
        rotate: [0, 0, 180, 360, 360, 360],
        transition: { duration: 1.3, times: [0, 0.12, 0.4, 0.62, 0.86, 1], ease: 'easeInOut' },
      }
    case 'dance':
      return { rotate: [0, 8, -8, 8, -8, 0], transition: { duration: 1.4 } }
    case 'shiver':
      return { y: [0, -8, -8, 0], transition: { duration: 1, times: [0, 0.15, 0.8, 1] } }
    case 'wind':
      // o boné quase voa
      return {
        x: [0, 16, 10, 24, 12, 18, 0],
        y: [0, -8, -4, -14, -5, -9, 0],
        rotate: [0, 16, 9, 24, 11, 17, 0],
        transition: { duration: 1.7, ease: 'easeInOut' },
      }
    case 'clouds':
      return { rotate: [0, -6, 6, -4, 0], transition: { duration: 2 } }
    default:
      return { x: 0, y: 0, rotate: 0 }
  }
}

function eyesAnim(action: NubeAction): TargetAndTransition {
  switch (action) {
    case 'capTrick':
      return { y: [0, 0, -7, -7, 0, 0], transition: { duration: 1.3, times: [0, 0.12, 0.4, 0.75, 0.86, 1] } }
    case 'shiver':
      return { scaleY: [1, 0.45, 0.45, 1], transition: { duration: 1, times: [0, 0.1, 0.85, 1] } }
    case 'wind':
      return { scaleY: [1, 0.35, 0.35, 0.35, 1], x: [0, 4, 4, 4, 0], transition: { duration: 1.7, times: [0, 0.1, 0.5, 0.88, 1] } }
    case 'clouds':
      return { x: [0, -6, -6, 6, 6, 0], y: [0, -3, -3, -3, -3, 0], transition: { duration: 2 } }
    default:
      return { x: 0, y: 0, scaleY: 1 }
  }
}

function chainAnim(action: NubeAction): TargetAndTransition {
  switch (action) {
    case 'dance':
      return { rotate: [0, 10, -10, 10, -10, 0], transition: { duration: 1.4 } }
    case 'jump':
      return { y: [0, 0, -6, 4, 0, 0], transition: { duration: 0.95 } }
    case 'wind':
      return { x: [0, 6, 3, 8, 4, 6, 0], rotate: [0, 5, 2, 7, 3, 5, 0], transition: { duration: 1.7 } }
    default:
      return { rotate: 0, y: 0, x: 0 }
  }
}

/** Elos da corrente cubana ao longo da curva */
function useChainLinks(count: number) {
  return useMemo(() => {
    const { p0, c, p2 } = CHAIN
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 0.5) / count
      const mt = 1 - t
      const x = mt * mt * p0[0] + 2 * mt * t * c[0] + t * t * p2[0]
      const y = mt * mt * p0[1] + 2 * mt * t * c[1] + t * t * p2[1]
      const dx = 2 * mt * (c[0] - p0[0]) + 2 * t * (p2[0] - c[0])
      const dy = 2 * mt * (c[1] - p0[1]) + 2 * t * (p2[1] - c[1])
      return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI, flat: i % 2 === 0 }
    })
  }, [count])
}

export default function NubeCharacter({
  size,
  action = 'idle',
  actionKey = 0,
  look = { x: 0, y: 0 },
  autoBlink = true,
  blinkSignal = 0,
  className,
}: NubeCharacterProps) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const [blinking, setBlinking] = useState(false)
  const links = useChainLinks(30)
  const [fur, setFur] = useState<string | null>(furCache)
  useEffect(() => {
    if (!fur) setFur(makeFurTexture() || null)
  }, [fur])
  const u = (name: string) => `url(#${name}-${id})`

  // Piscadas automáticas em intervalos aleatórios (às vezes duas seguidas)
  useEffect(() => {
    if (!autoBlink) return
    let timer: ReturnType<typeof setTimeout>
    let alive = true
    const schedule = () => {
      timer = setTimeout(() => {
        if (!alive) return
        setBlinking(true)
        setTimeout(() => alive && setBlinking(false), 140)
        if (Math.random() < 0.3) {
          setTimeout(() => alive && setBlinking(true), 280)
          setTimeout(() => alive && setBlinking(false), 420)
        }
        schedule()
      }, 2200 + Math.random() * 2800)
    }
    schedule()
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [autoBlink])

  // Piscada forçada
  useEffect(() => {
    if (!blinkSignal) return
    setBlinking(true)
    const t = setTimeout(() => setBlinking(false), 150)
    return () => clearTimeout(t)
  }, [blinkSignal])

  const lookX = Math.max(-1, Math.min(1, look.x)) * 6
  const lookY = Math.max(-1, Math.min(1, look.y)) * 4
  const winking = action === 'wink'
  const k = `${action}-${actionKey}`

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Pelúcia: relevo de pelinhos curtos + borda felpuda */}
        <filter id={`plush-${id}`} x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="11" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {fur && (
          <pattern id={`fur-${id}`} patternUnits="userSpaceOnUse" width="36" height="36">
            <image href={fur} width="36" height="36" />
          </pattern>
        )}
        <filter id={`soft-${id}`} x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id={`clip-${id}`}>
          <path d={BODY} />
        </clipPath>

        <radialGradient id={`body-${id}`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f6f6f8" />
          <stop offset="82%" stopColor="#dcdde3" />
          <stop offset="100%" stopColor="#b9bbc4" />
        </radialGradient>
        <radialGradient id={`under-${id}`} cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#9fa2ae" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9fa2ae" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`eye-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#6b3324" />
          <stop offset="45%" stopColor="#2b0e08" />
          <stop offset="100%" stopColor="#0d0302" />
        </radialGradient>
        <linearGradient id={`cap-${id}`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#3a3a3e" />
          <stop offset="45%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#060607" />
        </linearGradient>
        <linearGradient id={`brim-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232326" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <linearGradient id={`silver-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#c9cbd1" />
          <stop offset="55%" stopColor="#7d8089" />
          <stop offset="80%" stopColor="#e9eaee" />
          <stop offset="100%" stopColor="#9a9da6" />
        </linearGradient>
      </defs>

      {/* Sombra no chão */}
      <ellipse cx="100" cy="183" rx="68" ry="8" fill="#000" opacity="0.5" filter={u('soft')} />

      <motion.g key={`body-${k}`} style={BOTTOM} animate={bodyAnim(action)}>
        {/* Corpo de pelúcia */}
        <g filter={u('plush')}>
          <path d={BODY} fill={u('body')} />
          <g clipPath={u('clip')}>
            {fur && <rect x="0" y="0" width="200" height="200" fill={u('fur')} />}
            <ellipse cx="100" cy="190" rx="98" ry="40" fill={u('under')} />
            <ellipse cx="72" cy="88" rx="36" ry="24" fill="#fff" opacity="0.5" />
          </g>
        </g>

        {/* Piercing na lateral */}
        <g>
          <circle cx="171" cy="132" r="5" fill="none" stroke="#5f626b" strokeWidth="2.6" />
          <circle cx="171" cy="132" r="5" fill="none" stroke={u('silver')} strokeWidth="1.8" />
          <circle cx="168.5" cy="128.5" r="1" fill="#fff" />
        </g>

        {/* Corrente cubana prata */}
        <motion.g key={`chain-${k}`} style={TOP_CENTER} animate={chainAnim(action)}>
          {links.map((l, i) => (
            <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.angle})`}>
              <ellipse cx="0" cy="1.1" rx="3.3" ry={l.flat ? 2.5 : 1.6} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="1.9" />
              <ellipse cx="0" cy="0" rx="3.3" ry={l.flat ? 2.5 : 1.6} fill="none" stroke={u('silver')} strokeWidth={l.flat ? 1.7 : 1.4} />
              {l.flat && <circle cx="-1.4" cy="-1.6" r="0.6" fill="#fff" />}
            </g>
          ))}
        </motion.g>

        {/* Olhos */}
        <motion.g key={`eyes-${k}`} style={CENTER} animate={eyesAnim(action)}>
          <motion.g animate={{ x: lookX, y: lookY }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
            {[
              { cx: 76, closed: blinking },
              { cx: 124, closed: blinking || winking },
            ].map((e, i) => (
              <motion.g
                key={i}
                style={CENTER}
                animate={{ scaleY: e.closed ? 0.08 : 1 }}
                transition={winking && i === 1 ? { duration: 0.12, delay: 0.15 } : { duration: 0.07 }}
              >
                <ellipse cx={e.cx} cy="131" rx="10" ry="13" fill={u('eye')} />
                <ellipse cx={e.cx} cy="131" rx="10" ry="13" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
                <ellipse cx={e.cx - 3.4} cy="125" rx="3.4" ry="4" fill="#fff" opacity="0.95" />
                <circle cx={e.cx + 3.6} cy="136.5" r="1.6" fill="#fff" opacity="0.55" />
              </motion.g>
            ))}
          </motion.g>
        </motion.g>

        {/* Boné (cobre a cabeça inteira) */}
        <motion.g key={`cap-${k}`} style={CENTER} animate={capAnim(action)}>
          {/* copa */}
          <path d={CROWN} fill={u('cap')} />
          {/* aba */}
          <path d={BRIM} fill={u('brim')} />
          {/* textura de tecido */}
          {fur && (
            <g opacity="0.1" style={{ mixBlendMode: 'screen' }}>
              <path d={CROWN} fill={u('fur')} />
              <path d={BRIM} fill={u('fur')} />
            </g>
          )}
          {/* costuras dos gomos */}
          <path d="M100 22 Q98 58 100 92" stroke="#3a3a40" strokeWidth="1.1" fill="none" strokeDasharray="2 1.5" />
          <path d="M100 22 Q64 40 56 97" stroke="#3a3a40" strokeWidth="1.1" fill="none" strokeDasharray="2 1.5" />
          <path d="M100 22 Q136 40 144 97" stroke="#3a3a40" strokeWidth="1.1" fill="none" strokeDasharray="2 1.5" />
          {/* costura da aba */}
          <path d="M27 112 Q100 99 173 112" stroke="#38383d" strokeWidth="1" fill="none" strokeDasharray="2.5 1.8" />
          {/* ilhoses */}
          <circle cx="76" cy="44" r="1.6" fill="#45454b" />
          <circle cx="124" cy="44" r="1.6" fill="#45454b" />
          {/* botão do topo */}
          <ellipse cx="100" cy="21" rx="6.5" ry="3" fill="#202024" />
          {/* logo: nuvenzinha bordada */}
          <path
            d="M86 72 a6 6 0 0 1 5-8.5 a8.5 8.5 0 0 1 16-1.2 a6 6 0 0 1 8.5 7.2 a5 5 0 0 1-2.4 8.5 h-24.6 a5 5 0 0 1-2.5-6 Z"
            fill="#f4f4f4"
          />
          {/* brilho */}
          <path d="M52 62 Q66 36 92 28" stroke="#fff" strokeOpacity="0.13" strokeWidth="7" strokeLinecap="round" fill="none" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

/** Nuvenzinha amiga (usada na animação "clouds" e na abertura) */
export function MiniCloud({ size, tone = '#ffffff', blink = false }: { size: number; tone?: string; blink?: boolean }) {
  return (
    <svg viewBox="0 0 60 44" width={size} height={size * (44 / 60)} aria-hidden="true" style={{ overflow: 'visible' }}>
      <path
        d="M12 40 C3 40 2 28 10 25 C9 15 19 9 27 13 C31 4 46 5 48 16 C57 17 59 30 52 34 C55 39 51 41 47 40 Z"
        fill={tone}
        style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.35))' }}
      />
      <ellipse cx="18" cy="34" rx="8" ry="4" fill="#000" opacity="0.06" />
      <g style={{ transformOrigin: '30px 27px', transform: blink ? 'scaleY(0.1)' : 'none', transition: 'transform 80ms' }}>
        <ellipse cx="25" cy="27" rx="2.4" ry="3.2" fill="#1b0a06" />
        <ellipse cx="35" cy="27" rx="2.4" ry="3.2" fill="#1b0a06" />
        <circle cx="24.2" cy="25.8" r="0.9" fill="#fff" />
        <circle cx="34.2" cy="25.8" r="0.9" fill="#fff" />
      </g>
      <ellipse cx="20" cy="31" rx="2.4" ry="1.3" fill="#ffb3c1" opacity="0.6" />
      <ellipse cx="40" cy="31" rx="2.4" ry="1.3" fill="#ffb3c1" opacity="0.6" />
    </svg>
  )
}
