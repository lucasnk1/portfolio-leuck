'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Language } from './i18n'

const KEY = 'site-lang'

/**
 * Idioma do site lembrado entre páginas (ex.: home → página de um projeto).
 * Começa em PT no servidor e lê o valor salvo depois de montar.
 */
export function useStoredLanguage(): [Language, (l: Language) => void] {
  const [lang, setLang] = useState<Language>('pt')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'pt' || saved === 'en') setLang(saved)
    } catch {}
  }, [])

  const update = useCallback((l: Language) => {
    setLang(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {}
  }, [])

  return [lang, update]
}
