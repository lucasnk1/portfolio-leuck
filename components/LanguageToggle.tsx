'use client'

import { Globe } from 'lucide-react'
import { Language } from '@/lib/i18n'

interface LanguageToggleProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-secondary" />
      <button
        onClick={() => onLanguageChange(currentLanguage === 'pt' ? 'en' : 'pt')}
        className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-200"
      >
        {currentLanguage === 'pt' ? 'EN' : 'PT'}
      </button>
    </div>
  )
}

export default LanguageToggle 