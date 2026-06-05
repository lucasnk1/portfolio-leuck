import { Heart } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'

interface FooterProps {
  currentLanguage: Language
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const t = translations[currentLanguage]

  return (
    <footer className="py-8 relative">
      <div className="divider-chrome mb-8"></div>
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-dim mb-2 text-sm">
            <span>{t.footer.madeWith}</span>
            <Heart size={14} className="text-dim/60" />
            <span>{t.footer.by}</span>
          </div>
          <p className="text-dim/50 text-xs">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer