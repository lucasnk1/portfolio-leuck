'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'
import LanguageToggle from './LanguageToggle'
import NubeMark from './NubeMark'

interface HeaderProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const SECTION_IDS = ['home', 'sobre', 'projetos', 'skills', 'certificados', 'contato'] as const
const HEADER_OFFSET = 80

// a partir daqui, rolar para baixo encolhe a navbar em uma pílula flutuante
const COMPACT_AFTER = 140
// quanto precisa rolar numa direção para trocar de estado (evita tremedeira)
const SCROLL_THRESHOLD = 8

const spring = { type: 'spring' as const, stiffness: 240, damping: 30, mass: 0.9 }

/** Marca: o Nube + "Lucas Leuck" em duas tonalidades */
function Brand({ compact, onClick }: { compact: boolean; onClick: () => void }) {
  return (
    <motion.button layout="position" onClick={onClick} className="flex items-center gap-2.5 shrink-0" aria-label="Lucas Leuck · Home">
      <motion.span
        layout
        className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]"
        style={{ width: compact ? 36 : 38, height: compact ? 36 : 38 }}
      >
        <NubeMark size={28} />
      </motion.span>
      <motion.span layout="position" className="font-heading text-lg tracking-tight leading-none whitespace-nowrap">
        <span className="font-semibold text-foreground">Lucas</span>
        <span className="font-semibold text-foreground ml-1">Leuck</span>
      </motion.span>
    </motion.button>
  )
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hovering, setHovering] = useState(false)
  const ticking = useRef(false)
  const lastY = useRef(0)
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
    lastY.current = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 20)

      // descendo = pílula flutuante; subindo um pouco = navbar completa
      const dy = y - lastY.current
      if (y < COMPACT_AFTER) {
        setCompact(false)
        lastY.current = y
      } else if (dy > SCROLL_THRESHOLD) {
        setCompact(true)
        lastY.current = y
      } else if (dy < -SCROLL_THRESHOLD) {
        setCompact(false)
        lastY.current = y
      }

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
      window.scrollTo({ top, behavior: 'smooth' })
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

  // passar o mouse (ou abrir o menu) volta para a navbar completa
  const isCompact = compact && !hovering && !isMenuOpen

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        layout
        transition={{ layout: spring }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ borderRadius: isCompact ? 999 : 0 }}
        className={`pointer-events-auto overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 ${
          isCompact
            ? 'mt-3 border border-white/[0.12] bg-chrome-950/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]'
            : `w-full border-b ${
                isScrolled ? 'bg-background/80 backdrop-blur-md border-white/[0.05]' : 'bg-transparent border-transparent'
              }`
        }`}
      >
        <motion.div
          layout="position"
          className={`flex items-center ${
            isCompact ? 'gap-3 sm:gap-4 h-14 pl-2.5 pr-2.5' : 'container-custom justify-between gap-6 h-16 px-4 sm:px-6'
          }`}
        >
          <Brand compact={isCompact} onClick={() => scrollToSection('home')} />

          {/* links: somem na pílula e voltam com um fade suave */}
          <AnimatePresence initial={false} mode="popLayout">
            {!isCompact && (
              <motion.nav
                key="links"
                initial={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden md:flex items-center space-x-8"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link text-sm tracking-wide ${activeSection === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div layout="position" className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* na pílula, mostra em que seção a pessoa está */}
            <AnimatePresence initial={false} mode="popLayout">
              {isCompact && (
                <motion.span
                  key="section"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.3 }}
                  className="hidden sm:inline text-xs text-dim border-l border-white/10 pl-4 pr-1 whitespace-nowrap"
                >
                  {navItems.find((i) => i.id === activeSection)?.label}
                </motion.span>
              )}
            </AnimatePresence>
            <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-dim hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden container-custom px-4"
            >
              <nav className="glass-card rounded-lg mb-4 flex flex-col space-y-1 p-4">
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}

export default Header
