'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Check, MessageCircle } from 'lucide-react'
import type { Language } from '@/lib/i18n'
import { useStoredLanguage } from '@/lib/use-language'
import { AREA_IDS, NUBE_COPY, NUBE_APP_SHOT, NUBE_IMAGE, type AreaId, type StatusId } from '@/lib/nube-content'
import NubeAssistant from '@/components/nube/NubeAssistant'
import { Eyebrow, ProjectEnd, ProjectFooter, ProjectHeader, Reveal, SectionHeading } from './ProjectPageKit'

/* Conversa ilustrativa que se escreve sozinha no visual da abertura */
function DemoChat({ lang }: { lang: Language }) {
  const c = NUBE_COPY[lang].hero
  const [i, setI] = useState(0)
  const [typed, setTyped] = useState(0)
  const item = c.demo[i]

  useEffect(() => {
    setTyped(0)
  }, [i, lang])

  useEffect(() => {
    if (typed < item.a.length) {
      const t = setTimeout(() => setTyped((n) => n + 2), 22)
      return () => clearTimeout(t)
    }
    const next = setTimeout(() => setI((n) => (n + 1) % c.demo.length), 3200)
    return () => clearTimeout(next)
  }, [typed, item.a.length, c.demo.length])

  return (
    <div className="border border-white/15 bg-white/[0.02]">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.06] font-mono text-[10px] sm:text-[11px] tracking-widest">
        <span className="text-dim">{c.barLeft}</span>
        <span className="flex items-center gap-1.5 text-chrome-200">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {c.barRight}
        </span>
      </div>

      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img src={NUBE_IMAGE} alt="Nube" className="absolute inset-0 w-full h-full object-cover object-[50%_35%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <p className="absolute bottom-4 left-5 font-heading font-extrabold tracking-tighter text-5xl text-white">
          NUBE<span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white to-chrome-400 ml-1" />
        </p>
      </div>

      <div className="p-4 space-y-3 min-h-[188px] border-t border-white/[0.06]">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-chrome-500">
          <span>{c.demoLabel}</span>
          <span>{item.area}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i + lang} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-white to-chrome-300 text-background text-sm px-3.5 py-2">{item.q}</p>
            </div>
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.06] text-sm px-3.5 py-2">
                {item.a.slice(0, typed)}
                {typed < item.a.length && <span className="inline-block w-1.5 h-3.5 bg-white/70 ml-0.5 align-middle animate-pulse" />}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-1.5 pt-1">
          {c.demo.map((d, k) => (
            <button key={d.area} onClick={() => setI(k)} aria-label={d.area} className={`h-1 flex-1 rounded-full transition-colors ${k === i ? 'bg-white' : 'bg-white/15'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

const STATUS_STYLE: Record<StatusId, string> = {
  done: 'bg-white text-background',
  dev: 'border border-white/30 text-foreground',
  planned: 'border border-dashed border-white/20 text-chrome-400',
}

export default function NubeProject() {
  const [lang, setLang] = useStoredLanguage()
  const c = NUBE_COPY[lang]
  const [area, setArea] = useState<AreaId>('college')
  const a = c.areas.items[area]

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const openChat = () => window.dispatchEvent(new CustomEvent('nube:open'))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHeader
        lang={lang}
        onLangChange={setLang}
        links={[
          { href: '#como-funciona', label: c.nav.how },
          { href: '#areas', label: c.nav.areas },
          { href: '#status', label: c.nav.status },
        ]}
      />

      <main className="pt-16">
        {/* Abertura */}
        <section id="topo" className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <Reveal>
                <Eyebrow>{c.hero.eyebrow}</Eyebrow>
                <h1 className="text-6xl sm:text-8xl font-heading font-extrabold tracking-tighter leading-none mb-6">
                  <span className="chrome-text-animated">{c.hero.title}</span>
                  <span className="text-white">.</span>
                </h1>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-chrome-200 mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {c.hero.status} · {c.hero.openSource.toUpperCase()}
                </p>
                <p className="text-dim leading-relaxed mb-7 max-w-xl">{c.hero.lead}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {c.hero.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] tracking-wider px-3 py-1.5 border border-white/15 text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#como-funciona" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                    {c.hero.how} <ArrowDown size={15} />
                  </a>
                  <button onClick={openChat} className="btn-chrome inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <MessageCircle size={15} /> {c.hero.chat}
                  </button>
                </div>
                <Link href="/#projetos" className="inline-block mt-5 text-sm text-dim hover:text-foreground transition-colors">
                  {c.hero.back}
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="min-w-0">
              <DemoChat lang={lang} />
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

        {/* Print do app */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="container-custom">
            <SectionHeading eyebrow={c.shot.eyebrow} title={c.shot.title} intro={c.shot.intro} />
            <Reveal>
              <img
                src={NUBE_APP_SHOT}
                alt={c.shot.alt}
                loading="lazy"
                className="block w-full h-auto border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </Reveal>
          </div>
        </section>

        {/* 01 Visão geral */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom grid lg:grid-cols-2 gap-12">
            <Reveal>
              <Eyebrow>{c.overview.eyebrow}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-6">{c.overview.title}</h2>
              <p className="text-dim leading-relaxed mb-4">{c.overview.p1}</p>
              <p className="text-dim leading-relaxed">{c.overview.p2}</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] self-start">
              {c.overview.facts.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className="bg-background p-6">
                  <p className="font-heading font-semibold mb-2">{f.title}</p>
                  <p className="text-sm text-dim leading-relaxed">{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 02 Como funciona */}
        <section id="como-funciona" className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.how.eyebrow} title={c.how.title} intro={c.how.intro} />

            <ol className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] mb-10">
              {c.how.flow.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-background p-5"
                >
                  <small className="font-mono text-[10px] tracking-widest text-chrome-400">{s.tag}</small>
                  <p className="font-heading font-semibold text-lg mt-2 mb-1">{s.title}</p>
                  <p className="text-xs text-dim">{s.text}</p>
                  {i < c.how.flow.length - 1 && (
                    <span className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full border border-white/20 bg-background text-[11px] text-chrome-300">
                      →
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.how.cards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.08} className="border border-white/[0.08] p-6 bg-background">
                  <small className="font-mono text-[10px] tracking-widest text-chrome-400">{card.tag}</small>
                  <h3 className="font-heading font-semibold text-xl mt-2 mb-2">{card.title}</h3>
                  <p className="text-sm text-dim leading-relaxed">{card.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Áreas */}
        <section id="areas" className="px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.areas.eyebrow} title={c.areas.title} intro={c.areas.intro} />
            <div className="flex flex-wrap border border-white/10 w-fit mb-8">
              {AREA_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => setArea(id)}
                  className={`px-5 py-2.5 text-sm transition-colors ${area === id ? 'bg-white text-background font-semibold' : 'text-dim hover:text-foreground'}`}
                >
                  {c.areas.items[id].name}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={area + lang}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="border border-white/[0.08] p-6">
                  <p className="font-mono text-[11px] tracking-widest text-chrome-400 mb-4">{c.areas.tracks.toUpperCase()}</p>
                  <ul className="space-y-3">
                    {a.tracks.map((t) => (
                      <li key={t} className="flex gap-3 text-sm">
                        <span className="text-chrome-300">→</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-white/[0.08] p-6">
                  <p className="font-mono text-[11px] tracking-widest text-chrome-400 mb-4">{c.areas.asks.toUpperCase()}</p>
                  <div className="space-y-3">
                    {a.asks.map((q) => (
                      <p key={q} className="w-fit max-w-full rounded-2xl rounded-br-md bg-gradient-to-br from-white to-chrome-300 text-background text-sm px-3.5 py-2">
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 04 Status */}
        <section id="status" className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.status.eyebrow} title={c.status.title} intro={c.status.intro} />
            <ol className="border border-white/[0.08] divide-y divide-white/[0.06]">
              {c.status.items.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 p-5"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs ${
                      s.status === 'done' ? 'bg-white text-background border-white' : 'border-white/20 text-chrome-300'
                    }`}
                  >
                    {s.status === 'done' ? <Check size={15} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-heading font-semibold">{s.title}</p>
                    <p className="text-sm text-dim">{s.text}</p>
                  </div>
                  <span className={`col-start-2 sm:col-start-3 w-fit font-mono text-[10px] tracking-widest px-2.5 py-1 ${STATUS_STYLE[s.status]}`}>
                    {c.status.labels[s.status]}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 Privacidade e segurança */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={c.notes.eyebrow} title={c.notes.title} />
            <div className="grid sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
              {c.notes.items.map((n, i) => (
                <Reveal key={n.title} delay={(i % 2) * 0.08} className="bg-background p-6">
                  <p className="font-mono text-[10px] tracking-widest text-chrome-400 mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-heading font-semibold text-lg mb-2">{n.title}</h3>
                  <p className="text-sm text-dim leading-relaxed">{n.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ProjectEnd eyebrow={c.end.eyebrow} title={c.end.title} button={c.end.button} />
      </main>

      <ProjectFooter text={c.footer} top={c.top} />

      {/* o Nube do site também mora nesta página */}
      <NubeAssistant currentLanguage={lang} show />
    </div>
  )
}
