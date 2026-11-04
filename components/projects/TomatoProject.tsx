'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowUpRight, FileText, Github, Play, Presentation } from 'lucide-react'
import type { Language } from '@/lib/i18n'
import { useStoredLanguage } from '@/lib/use-language'
import {
  CLASSES,
  CONFUSIONS,
  COPY,
  FEATURE_GROUPS,
  IMAGES,
  LINKS,
  RESULTS,
  fmt,
} from '@/lib/tomate-content'

import { Bar, Eyebrow, Reveal, SectionHeading } from './ProjectPageKit'

/* ------------------------------------------------------------------ */
/* Visual da abertura: saída real do pipeline, etapa por etapa         */
/* ------------------------------------------------------------------ */

function StageViewer({ lang }: { lang: Language }) {
  const c = COPY[lang].hero
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setStage((s) => (s + 1) % 4), 3200)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      className="border border-white/15 bg-white/[0.02]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.06] font-mono text-[10px] sm:text-[11px] tracking-widest">
        <span className="text-dim">{c.barLeft}</span>
        <span className="flex items-center gap-1.5 text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {c.barRight}
        </span>
      </div>

      <div className="relative p-3 sm:p-4">
        <img src={IMAGES.hero} alt={c.hint} className="w-full rounded-md" />
        {/* moldura que destaca a etapa atual */}
        <motion.div
          className="absolute top-3 sm:top-4 bottom-3 sm:bottom-4 rounded-md ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.25)] pointer-events-none"
          animate={{ left: `calc(${stage * 25}% + ${stage === 0 ? 12 : 4}px)`, width: 'calc(25% - 12px)' }}
          transition={{ type: 'spring', stiffness: 160, damping: 22 }}
        />
      </div>

      <div className="grid grid-cols-4 border-t border-white/[0.06]">
        {c.stages.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setStage(i)}
            className={`px-2 py-2.5 text-[10px] sm:text-xs font-mono tracking-wide text-left transition-colors border-r last:border-r-0 border-white/[0.06] ${
              stage === i ? 'text-white bg-white/[0.06]' : 'text-dim hover:text-foreground'
            }`}
          >
            {String(i + 1).padStart(2, '0')} · {s.name}
          </button>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/[0.06] min-h-[64px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage + lang}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-dim"
          >
            {c.stages[stage].text}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="px-4 pb-3 font-mono text-[10px] tracking-widest text-chrome-500">{c.hint}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function TomatoProject() {
  const [lang, setLang] = useStoredLanguage()
  const c = COPY[lang]
  const [task, setTask] = useState<'binary' | 'multi'>('multi')
  const [importanceMode, setImportanceMode] = useState<'total' | 'per'>('per')
  const [activeClass, setActiveClass] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const metricKeys = ['acc', 'prec', 'rec', 'f1'] as const
  const rows = RESULTS[task]
  const maxConf = CONFUSIONS[0].n
  const perMax = Math.max(...FEATURE_GROUPS.map((g) => g.perFeature))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cabeçalho */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="container-custom px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/#projetos" className="flex items-center gap-2 font-heading font-bold chrome-text tracking-tight">
            <ArrowLeft size={16} className="text-dim" />
            {c.nav.back}
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#pipeline" className="nav-link hidden sm:inline">{c.nav.pipeline}</a>
            <a href="#resultados" className="nav-link hidden sm:inline">{c.nav.results}</a>
            <a href="#limitacoes" className="nav-link hidden md:inline">{c.nav.limits}</a>
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
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

      <main className="pt-16">
        {/* Abertura */}
        <section id="topo" className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <Eyebrow>{c.hero.eyebrow}</Eyebrow>
                <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.05] mb-6">
                  {c.hero.titleA}
                  <span className="chrome-text-animated">{c.hero.titleB}</span>
                </h1>
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
                  <a href="#resultados" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                    {c.hero.seeResults} <ArrowDown size={15} />
                  </a>
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-chrome inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <Github size={15} /> GitHub
                  </a>
                  <a href={LINKS.paper} target="_blank" rel="noopener noreferrer" className="btn-chrome inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <FileText size={15} /> {c.hero.paper}
                  </a>
                </div>
                <div className="flex flex-wrap gap-5 mt-5 text-sm">
                  <a href={LINKS.slides} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-dim hover:text-white transition-colors">
                    <Presentation size={14} /> {c.hero.slides}
                  </a>
                  <a href={LINKS.colab} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-dim hover:text-white transition-colors">
                    <Play size={14} /> {c.hero.colab}
                  </a>
                  <Link href="/#projetos" className="text-dim hover:text-foreground transition-colors">
                    {c.hero.back}
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <StageViewer lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* Números */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="container-custom grid grid-cols-2 sm:grid-cols-5 border border-white/[0.08]">
            {c.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className={`p-5 border-white/[0.08] ${i < 4 ? 'sm:border-r' : ''} ${i % 2 === 0 ? 'border-r sm:border-r' : ''} ${i < 4 ? 'border-b sm:border-b-0' : ''}`}
              >
                <p className={`text-2xl sm:text-3xl font-heading font-bold ${i >= 3 ? 'text-white' : ''}`}>{s.value}</p>
                <p className="text-xs text-dim mt-1">{s.label}</p>
              </Reveal>
            ))}
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

        {/* 02 Pipeline */}
        <section id="pipeline" className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.pipeline.eyebrow} title={c.pipeline.title} intro={c.pipeline.intro} />

            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-white/[0.08] border border-white/[0.08] mb-12">
              {c.pipeline.steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative bg-background p-4 group hover:bg-white/[0.04] transition-colors"
                >
                  <small className="font-mono text-[10px] tracking-widest text-chrome-400">
                    {String(i + 1).padStart(2, '0')} / {s.tag}
                  </small>
                  <p className="font-heading font-semibold mt-2 mb-1 leading-snug">{s.title}</p>
                  <p className="text-xs text-dim leading-relaxed">{s.text}</p>
                </motion.li>
              ))}
            </ol>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: c.pipeline.leafTitle, text: c.pipeline.leafText, formula: c.pipeline.leafFormula },
                { title: c.pipeline.lesionTitle, text: c.pipeline.lesionText, formula: c.pipeline.lesionFormula },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1} className="min-w-0 border border-white/[0.08] p-6 bg-background">
                  <h3 className="font-heading font-semibold text-xl mb-3">{b.title}</h3>
                  <p className="text-sm text-dim leading-relaxed mb-5">{b.text}</p>
                  <code className="block font-mono text-xs sm:text-sm text-chrome-100 bg-white/[0.06] border border-white/15 px-4 py-3 break-words sm:whitespace-nowrap sm:overflow-x-auto">
                    {b.formula}
                  </code>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 03 As 10 classes */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom">
            <SectionHeading eyebrow={c.gallery.eyebrow} title={c.gallery.title} intro={c.gallery.intro} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {CLASSES.map((cl, i) => {
                const on = activeClass === cl.id
                return (
                  <motion.button
                    key={cl.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                    onMouseEnter={() => setActiveClass(cl.id)}
                    onMouseLeave={() => setActiveClass(null)}
                    onClick={() => setActiveClass(on ? null : cl.id)}
                    className={`text-left border transition-colors ${on ? 'border-white/40' : 'border-white/[0.08]'} bg-white/[0.02]`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img src={cl.img} alt={cl[lang]} loading="lazy" className={`w-full h-full object-cover transition-transform duration-500 ${on ? 'scale-110' : ''}`} />
                      <AnimatePresence>
                        {on && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-[2px] p-3 flex flex-col justify-end gap-2 font-mono text-[11px]"
                          >
                            <div className="flex justify-between"><span className="text-dim">{c.gallery.prec}</span><span>{fmt(cl.prec, lang, 2)}</span></div>
                            <div className="flex justify-between"><span className="text-dim">{c.gallery.rec}</span><span>{fmt(cl.rec, lang, 2)}</span></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold leading-tight">{cl[lang]}</p>
                      <p className="text-[11px] text-chrome-500 font-mono mb-2">{cl.en}</p>
                      <div className="flex items-center gap-2">
                        <Bar value={cl.f1} highlight={cl.f1 >= 0.95} delay={0.2} />
                        <span className="font-mono text-[11px] text-dim shrink-0">F1 {fmt(cl.f1, lang, 2)}</span>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 04 Características */}
        <section className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05]">
          <div className="container-custom">
            <SectionHeading eyebrow={c.features.eyebrow} title={c.features.title} intro={c.features.intro} />
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex border border-white/10 mb-6">
                  {(['per', 'total'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setImportanceMode(m)}
                      className={`px-4 py-2 text-xs font-mono tracking-wide transition-colors ${importanceMode === m ? 'bg-white text-background' : 'text-dim hover:text-foreground'}`}
                    >
                      {m === 'per' ? c.features.togglePer : c.features.toggleTotal}
                    </button>
                  ))}
                </div>
                <div className="space-y-6">
                  {FEATURE_GROUPS.map((g, i) => {
                    const info = c.features.groups[g.id]
                    const value = importanceMode === 'total' ? g.total : g.perFeature
                    const max = importanceMode === 'total' ? 100 : perMax
                    const label = importanceMode === 'total' ? `${fmt(g.total, lang, 1)}%` : `≈${fmt(g.perFeature, lang, 3)}`
                    const top = importanceMode === 'total' ? g.id === 'color' : g.id === 'texture'
                    return (
                      <Reveal key={g.id} delay={i * 0.08}>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <p className="font-heading font-semibold">
                            {info.name} <span className="font-mono text-xs text-chrome-500 ml-1">{g.dims} {c.features.dims}</span>
                          </p>
                          <span className={`font-mono text-sm ${top ? 'text-white' : 'text-dim'}`}>{label}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden mb-2">
                          <motion.div
                            className={`h-full rounded-full ${top ? 'bg-white' : 'bg-white/40'}`}
                            animate={{ width: `${(value / max) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                          />
                        </div>
                        <p className="text-xs text-dim leading-relaxed">{info.desc}</p>
                      </Reveal>
                    )
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={importanceMode + lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 text-sm text-foreground/80 border-l-2 border-white/60 pl-4"
                  >
                    {importanceMode === 'total' ? c.features.totalNote : c.features.perNote}
                  </motion.p>
                </AnimatePresence>
              </div>
              <Reveal delay={0.1} className="border border-white/[0.08] p-5 bg-background">
                <p className="font-heading font-semibold mb-4">{c.features.topTitle}</p>
                <img src={IMAGES.importance} alt={c.features.topTitle} loading="lazy" className="w-full rounded bg-white" />
                <p className="text-xs text-dim leading-relaxed mt-4">{c.features.topText}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 05 Resultados */}
        <section id="resultados" className="px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.results.eyebrow} title={c.results.title} intro={c.results.intro} />

            <div className="inline-flex border border-white/10 mb-6">
              {(['binary', 'multi'] as const).map((tk) => (
                <button
                  key={tk}
                  onClick={() => setTask(tk)}
                  className={`px-5 py-2.5 text-sm transition-colors ${task === tk ? 'bg-white text-background font-semibold' : 'text-dim hover:text-foreground'}`}
                >
                  {tk === 'binary' ? c.results.binary : c.results.multi}
                </button>
              ))}
            </div>

            <div className="border border-white/[0.08] overflow-x-auto mb-4">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] font-mono text-[11px] tracking-widest text-chrome-500">
                    <th className="text-left font-normal px-5 py-3">{c.results.model.toUpperCase()}</th>
                    {metricKeys.map((k) => (
                      <th key={k} className="text-left font-normal px-5 py-3">{c.results[k].toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.model + task} className="border-b last:border-b-0 border-white/[0.06]">
                      <td className="px-5 py-4 font-semibold whitespace-nowrap">
                        {r.model}
                        {'best' in r && r.best && (
                          <span className="ml-2 font-mono text-[10px] tracking-widest text-background bg-white px-1.5 py-0.5">{c.results.best}</span>
                        )}
                      </td>
                      {metricKeys.map((k, j) => (
                        <td key={k} className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono w-12">{fmt(r[k], lang)}</span>
                            <div className="w-24 hidden sm:block">
                              <Bar value={r[k] - 0.8} max={0.2} highlight={'best' in r && !!r.best} delay={j * 0.05} />
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={task + lang}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-dim leading-relaxed max-w-3xl mb-14"
              >
                {task === 'binary' ? c.results.binaryNote : c.results.multiNote}
              </motion.p>
            </AnimatePresence>

            <div className="grid lg:grid-cols-2 gap-10">
              <Reveal className="border border-white/[0.08] p-5 bg-white">
                <img src={IMAGES.matrix} alt={c.results.matrixTitle} loading="lazy" className="w-full" />
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="font-heading font-semibold text-2xl mb-2">{c.results.confTitle}</h3>
                <p className="text-sm text-dim mb-6">{c.results.confIntro}</p>
                <ul className="space-y-3 mb-6">
                  {CONFUSIONS.map((cf, i) => (
                    <li key={i}>
                      <div className="flex items-baseline justify-between gap-3 text-sm mb-1">
                        <span>
                          <span className="text-foreground">{cf.real}</span>
                          <span className="text-chrome-500 mx-1.5">→</span>
                          <span className={cf.pred === 'Late blight' ? 'text-white' : 'text-foreground'}>{cf.pred}</span>
                        </span>
                        <span className="font-mono text-xs text-dim shrink-0">
                          {cf.n} {c.results.images}
                        </span>
                      </div>
                      <Bar value={cf.n} max={maxConf} highlight={cf.pred === 'Late blight'} delay={i * 0.05} />
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground/80 border-l-2 border-white/60 pl-4 leading-relaxed">{c.results.attractor}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 06 Limitações */}
        <section id="limitacoes" className="px-4 sm:px-6 py-20 bg-white/[0.015] border-y border-white/[0.05] scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.limits.eyebrow} title={c.limits.title} intro={c.limits.intro} />
            <div className="grid sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] mb-12">
              {c.limits.notes.map((n, i) => (
                <Reveal key={n.title} delay={(i % 2) * 0.08} className="bg-background p-6">
                  <p className="font-mono text-[10px] tracking-widest text-chrome-400 mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-heading font-semibold text-lg mb-2">{n.title}</h3>
                  <p className="text-sm text-dim leading-relaxed">{n.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2">{c.limits.twinsTitle}</h3>
                <p className="text-sm text-dim leading-relaxed">{c.limits.twinsText}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {IMAGES.twins.map((pair, i) => (
                  <div key={i} className="grid grid-cols-2 gap-1.5 border border-white/[0.08] p-1.5">
                    {pair.map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" className="w-full aspect-square object-cover" />
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 07 Parte 2: redes neurais */}
        <section id="parte-2" className="px-4 sm:px-6 py-20 scroll-mt-16">
          <div className="container-custom">
            <SectionHeading eyebrow={c.part2.eyebrow} title={c.part2.title} intro={c.part2.intro} />
            <div className="relative grid md:grid-cols-2 gap-6">
              {/* seta ligando as duas partes */}
              <span className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-white/20 bg-background text-chrome-300">
                →
              </span>
              {c.part2.cards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={i * 0.12}
                  className={`relative p-7 border ${card.done ? 'border-white/15 bg-white/[0.02]' : 'border-dashed border-white/25'}`}
                >
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-chrome-300 mb-4">
                    <span className={`h-1.5 w-1.5 rounded-full ${card.done ? 'bg-chrome-400' : 'bg-white animate-pulse'}`} />
                    {card.tag}
                  </p>
                  <h3 className="font-heading font-bold text-2xl tracking-tight mb-3">{card.title}</h3>
                  <p className="text-sm text-dim leading-relaxed">{card.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 08 Conclusão */}
        <section className="px-4 sm:px-6 py-20">
          <div className="container-custom grid lg:grid-cols-[3fr_2fr] gap-12">
            <Reveal>
              <Eyebrow>{c.conclusion.eyebrow}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-6">{c.conclusion.title}</h2>
              <p className="text-dim leading-relaxed">{c.conclusion.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="border border-white/[0.08] p-6 self-start">
              <p className="font-heading font-semibold mb-4">{c.conclusion.nextTitle}</p>
              <ul className="space-y-2.5">
                {c.conclusion.next.map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-dim">
                    <span className="text-white">→</span>
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Créditos */}
        <section className="px-4 sm:px-6 pb-16">
          <Reveal className="container-custom border-t border-white/[0.08] pt-8 grid sm:grid-cols-[auto_1fr] gap-x-10 gap-y-2 text-sm">
            <p className="font-mono text-xs tracking-widest text-chrome-500">{c.credits.title.toUpperCase()}</p>
            <div className="space-y-1 text-dim">
              <p className="text-foreground">{c.credits.authors}</p>
              <p>{c.credits.course}</p>
              <p className="text-xs text-chrome-500 pt-2">{c.credits.dataset}</p>
            </div>
          </Reveal>
        </section>

        {/* Encerramento */}
        <section className="px-4 sm:px-6 py-24 text-center border-t border-white/[0.05]">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-4">{c.end.eyebrow}</p>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight mb-10 max-w-2xl mx-auto">{c.end.title}</h2>
            <Link href="/#projetos" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
              <ArrowLeft size={15} /> {c.end.button}
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-8 border-t border-white/[0.05]">
        <div className="container-custom flex items-center justify-between text-xs text-chrome-500">
          <p>{c.footer}</p>
          <a href="#topo" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
            {c.top} <ArrowUpRight size={12} className="-rotate-45" />
          </a>
        </div>
      </footer>
    </div>
  )
}
