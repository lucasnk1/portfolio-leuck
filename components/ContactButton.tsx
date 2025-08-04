'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'

interface ContactButtonProps {
  currentLanguage: Language
}

const ContactButton = ({ currentLanguage }: ContactButtonProps) => {
  const t = translations[currentLanguage]
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={scrollToContact}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn-primary flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl"
    >
      <MessageCircle size={20} />
      <span>{t.contact.title}</span>
    </motion.button>
  )
}

export default ContactButton 