'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Language } from '@/lib/i18n'

/* Peças compartilhadas pelas páginas de detalhes de projeto */

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-3">{children}</p>
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight">{title}</h2>
      </div>
      {intro && <p className="text-sm text-dim max-w-sm leading-relaxed">{intro}</p>}
    </Reveal>
  )
}

export function Bar({ value, max = 1, highlight = false, delay = 0 }: { value: number; max?: number; highlight?: boolean; delay?: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${highlight ? 'bg-white' : 'bg-white/40'}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

export function ProjectHeader({
  lang,
  onLangChange,
  links,
}: {
  lang: Language
  onLangChange: (l: Language) => void
  links: Array<{ href: string; label: string }>
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="container-custom px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/#projetos" className="flex items-center gap-2 font-heading font-bold chrome-text tracking-tight">
          <ArrowLeft size={16} className="text-dim" />
          Lucas Leuck
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} className={`nav-link ${i < 2 ? 'hidden sm:inline' : 'hidden md:inline'}`}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => onLangChange(lang === 'pt' ? 'en' : 'pt')}
            className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-colors"
            aria-label="Trocar idioma / Switch language"
          >
            <span className={lang === 'pt' ? 'text-foreground' : 'text-chrome-500'}>PT</span>
            <span className="text-chrome-600 mx-1">/</span>
            <span className={lang === 'en' ? 'text-foreground' : 'text-chrome-500'}>EN</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export function ProjectEnd({ eyebrow, title, button }: { eyebrow: string; title: string; button: string }) {
  return (
    <section className="px-4 sm:px-6 py-24 text-center border-t border-white/[0.05]">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-4">{eyebrow}</p>
        <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight mb-10 max-w-2xl mx-auto">{title}</h2>
        <Link href="/#projetos" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
          <ArrowLeft size={15} /> {button}
        </Link>
      </Reveal>
    </section>
  )
}

export function ProjectFooter({ text, top }: { text: string; top: string }) {
  return (
    <footer className="px-4 sm:px-6 py-8 border-t border-white/[0.05]">
      <div className="container-custom flex items-center justify-between text-xs text-chrome-500">
        <p>{text}</p>
        <a href="#topo" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
          {top} <ArrowUpRight size={12} className="-rotate-45" />
        </a>
      </div>
    </footer>
  )
}
