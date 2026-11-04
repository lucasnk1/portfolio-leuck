'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, BookOpen, Plus } from 'lucide-react'
import { useStoredLanguage } from '@/lib/use-language'
import { BOOK_COPY, BOOK_COVER, BOOK_URL } from '@/lib/livro-content'
import NubeAssistant from '@/components/nube/NubeAssistant'
import { Eyebrow, ProjectFooter, ProjectHeader, Reveal, SectionHeading } from './ProjectPageKit'

export default function BookProject() {
  const [lang, setLang] = useStoredLanguage()
  const c = BOOK_COPY[lang]
  const [part, setPart] = useState(0)
  const [openChapter, setOpenChapter] = useState<number | null>(0)
  const [quote, setQuote] = useState(0)

  // leve parallax na capa
  const { scrollY } = useScroll()
  const coverY = useTransform(scrollY, [0, 600], [0, 60])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  useEffect(() => {
    setOpenChapter(0)
  }, [part])

  // citações do epílogo trocando sozinhas
  useEffect(() => {
    const t = setInterval(() => setQuote((q) => (q + 1) % c.epilogue.quotes.length), 5200)
    return () => clearInterval(t)
  }, [c.epilogue.quotes.length])

  const activePart = c.contents.parts[part]
  // número do capítulo contínuo ao longo do livro
  const offset = c.contents.parts.slice(0, part).reduce((n, p) => n + p.chapters.length, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHeader
        lang={lang}
        onLangChange={setLang}
        links={[
          { href: '#ideia', label: c.nav.idea },
          { href: '#sumario', label: c.nav.contents },
          { href: '#epilogo', label: c.nav.epilogue },
        ]}
      />

      <main className="pt-16">
        {/* Abertura */}
        <section id="topo" className="px-4 sm:px-6 pt-16 sm:pt-20 pb-12">
          <div className="container-custom">
            <Reveal className="max-w-3xl">
              <Eyebrow>{c.hero.eyebrow}</Eyebrow>
              <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.05] mb-4">
                <span className="chrome-text-animated">{c.hero.title}</span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-foreground/80 mb-6">{c.hero.subtitle}</p>
              <p className="text-dim leading-relaxed mb-6">{c.hero.lead}</p>
              <p className="font-mono text-[11px] tracking-[0.2em] text-chrome-400 mb-8">{c.hero.meta}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                  <BookOpen size={15} /> {c.hero.read} <ArrowUpRight size={15} />
                </a>
                <a href="#sumario" className="btn-chrome inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                  {c.hero.contents} <ArrowDown size={15} />
                </a>
                <Link href="/#projetos" className="text-sm text-dim hover:text-foreground transition-colors ml-1">
                  {c.hero.back}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden border border-white/15 hover:border-white/30 transition-colors"
                aria-label={c.hero.read}
              >
                <motion.img
                  src={BOOK_COVER}
                  alt={c.hero.title}
                  style={{ y: coverY }}
                  className="w-full aspect-video object-cover scale-[1.08] group-hover:scale-[1.11] transition-transform duration-700"
                />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-xs font-mono tracking-widest px-3 py-2">
                  {c.hero.read.toUpperCase()} <ArrowUpRight size={13} />
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Números */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="container-custom grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08]">
            {c.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="bg-background p-5">
                <p className="text-2xl sm:text-3xl font-heading font-bold">{s.value}</p>
                <p className="text-xs text-dim mt-1">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 01 A ideia */}
        <section id="ideia" className="px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="container-custom">
            <Reveal>
              <Eyebrow>{c.idea.eyebrow}</Eyebrow>
              <blockquote className="font-serif text-3xl sm:text-5xl leading-tight tracking-tight max-w-4xl mb-12">
                “{c.idea.quote}”
              </blockquote>
            </Reveal>
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
              <Reveal delay={0.05}>
                <p className="text-dim leading-relaxed mb-4">{c.idea.p1}</p>
                <p className="text-dim leading-relaxed">{c.idea.p2}</p>
              </Reveal>
              <Reveal delay={0.1} className="border-l-2 border-white/60 pl-6 self-start">
                <p className="text-lg text-foreground/90 leading-relaxed">{c.idea.callout}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 02 Sumário */}
        <section id="sumario" className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.contents.eyebrow} title={c.contents.title} intro={c.contents.intro} />

            <div className="grid grid-cols-3 border border-white/10 mb-8">
              {c.contents.parts.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setPart(i)}
                  className={`text-left px-4 py-4 transition-colors border-r last:border-r-0 border-white/10 ${
                    part === i ? 'bg-white text-background' : 'text-dim hover:text-foreground'
                  }`}
                >
                  <span className="block font-mono text-[10px] tracking-widest opacity-70">{p.name.toUpperCase()}</span>
                  <span className="block font-heading font-semibold text-sm sm:text-base leading-tight mt-1">{p.title}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={part + lang}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-serif italic text-dim mb-5">({activePart.subtitle})</p>
                <ol className="border border-white/[0.08] divide-y divide-white/[0.06]">
                  {activePart.chapters.map((ch, i) => {
                    const isOpen = openChapter === i
                    return (
                      <li key={ch.title}>
                        <button
                          onClick={() => setOpenChapter(isOpen ? null : i)}
                          className="w-full flex items-center gap-5 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-mono text-xs text-chrome-500 w-16 shrink-0">
                            {c.contents.chapter.slice(0, 3)}. {String(offset + i + 1).padStart(2, '0')}
                          </span>
                          <span className="flex-1 font-heading font-semibold">{ch.title}</span>
                          <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-chrome-400">
                            <Plus size={16} />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 sm:pl-[6.25rem] text-sm text-dim leading-relaxed">{ch.summary}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  })}
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 03 Com quem conversa */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={c.voices.eyebrow} title={c.voices.title} />
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
              {c.voices.items.map((v, i) => (
                <Reveal key={v.name} delay={i * 0.08} className="bg-background p-6">
                  <p className="font-heading font-semibold text-lg">{v.name}</p>
                  <p className="font-serif italic text-sm text-chrome-300 mb-3">{v.work}</p>
                  <p className="text-sm text-dim leading-relaxed">{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Epílogo */}
        <section id="epilogo" className="px-4 sm:px-6 py-24 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom text-center">
            <Reveal>
              <Eyebrow>{c.epilogue.eyebrow}</Eyebrow>
              <p className="font-heading font-semibold text-xl mb-10">{c.epilogue.title}</p>
            </Reveal>
            <div className="min-h-[9rem] sm:min-h-[7rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={quote + lang}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-2xl sm:text-4xl leading-snug max-w-3xl mx-auto"
                >
                  “{c.epilogue.quotes[quote]}”
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {c.epilogue.quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuote(i)}
                  aria-label={`${i + 1}`}
                  className={`h-1 w-8 rounded-full transition-colors ${i === quote ? 'bg-white' : 'bg-white/15'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 05 Nota do autor */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom grid lg:grid-cols-[2fr_3fr] gap-12 items-start">
            <Reveal>
              <Eyebrow>{c.author.eyebrow}</Eyebrow>
              <p className="font-serif italic text-2xl leading-snug text-foreground/90">“{c.author.quote}”</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-dim leading-relaxed mb-6">{c.author.text}</p>
              <p className="font-mono text-xs tracking-[0.2em] text-chrome-300">— {c.author.signature.toUpperCase()}</p>
            </Reveal>
          </div>
        </section>

        {/* Encerramento */}
        <section className="px-4 sm:px-6 py-24 text-center border-t border-white/[0.05]">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-4">{c.end.eyebrow}</p>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight mb-10">{c.end.title}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
                <BookOpen size={15} /> {c.end.read} <ArrowUpRight size={15} />
              </a>
              <Link href="/#projetos" className="btn-chrome inline-flex items-center gap-2 px-6 py-3 text-sm">
                {c.end.button}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <ProjectFooter text={c.footer} top={c.top} />
      <NubeAssistant currentLanguage={lang} show />
    </div>
  )
}
