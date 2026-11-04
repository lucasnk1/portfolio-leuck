'use client'

import { useEffect, useState } from 'react'

/**
 * Modo leve: celular/tablet (toque), tela pequena, aparelho com poucos núcleos
 * ou quem pediu menos movimento. Nesses casos o site desliga os efeitos mais
 * caros (filtros SVG, desfoques grandes, animações contínuas).
 */
export function isLiteDevice(): boolean {
  if (typeof window === 'undefined') return true
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  const lowCpu = (navigator.hardwareConcurrency || 8) <= 4
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return coarse || small || lowCpu || reduced
}

let cached: boolean | null = null

/** Começa em "leve" (igual no servidor e no cliente) e liga os efeitos completos depois, se o aparelho aguentar */
export function useLiteMode(): boolean {
  const [lite, setLite] = useState(cached ?? true)
  useEffect(() => {
    if (cached === null) cached = isLiteDevice()
    setLite(cached)
  }, [])
  return lite
}
