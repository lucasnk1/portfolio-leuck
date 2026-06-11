'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'
import LanguageToggle from './LanguageToggle'

interface HeaderProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const SECTION_IDS = ['home', 'sobre', 'projetos', 'skills', 'certificados', 'contato'] as const
const HEADER_OFFSET = 80

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const ticking = useRef(false)
  const t = translations[currentLanguage]

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + HEADER_OFFSET

    for (let index = SECTION_IDS.length - 1; index >= 0; index -= 1) {
      const sectionId = SECTION_IDS[index]
      const element = document.getElementById(sectionId)

      if (element && scrollPosition >= element.offsetTop) {
        setActiveSection(sectionId)
        return
      }
    }

    setActiveSection('home')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      if (ticking.current) return

      ticking.current = true
      window.requestAnimationFrame(() => {
        updateActiveSection()
        ticking.current = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateActiveSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }

    setIsMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'sobre', label: t.nav.about },
    { id: 'projetos', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'certificados', label: t.nav.certificates },
    { id: 'contato', label: t.nav.contact },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-white/[0.04]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xl font-heading font-bold chrome-text tracking-tight"
          >
            Lucas Leuck
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm tracking-wide ${
                  activeSection === item.id ? 'nav-link-active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-dim hover:text-foreground transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-card rounded-lg mt-2 mb-4">
            <nav className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'text-foreground bg-white/[0.05]' 
                      : 'text-dim hover:text-foreground hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
