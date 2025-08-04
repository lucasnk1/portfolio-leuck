import { Heart } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'

interface FooterProps {
  currentLanguage: Language
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const t = translations[currentLanguage]

  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span>{t.footer.madeWith}</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>{t.footer.by}</span>
          </div>
          <p className="text-secondary text-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 