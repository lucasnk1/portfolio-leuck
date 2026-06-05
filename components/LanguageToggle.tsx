'use client'

import { Globe } from 'lucide-react'
import { Language } from '@/lib/i18n'

interface LanguageToggleProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <button
      onClick={() => onLanguageChange(currentLanguage === 'pt' ? 'en' : 'pt')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
    >
      <Globe size={13} className="text-dim" />
      <span className="text-xs font-medium text-dim hover:text-foreground transition-colors duration-200">
        {currentLanguage === 'pt' ? 'EN' : 'PT'}
      </span>
    </button>
  )
}

export default LanguageToggle