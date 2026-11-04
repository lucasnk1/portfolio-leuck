'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import type { Language } from '@/lib/i18n'
import { FEATURED_PROJECT as P } from '@/lib/projects'
import { MiniCloud } from './nube/NubeCharacter'

const COPY = {
  pt: {
    heading: 'Projetos em destaque',
    cta: 'Ver detalhes do projeto',
    nube: {
      label: 'ASSISTENTE PESSOAL · IA',
      title: 'Nube',
      desc:
        'Meu assistente pessoal para tudo. Ele já está conectado ao meu Obsidian, onde guardo o que faço na faculdade, no trabalho, na academia (dieta e treino) e até no financeiro. Com um dashboard e um modelo rodando localmente pela API do Ollama, ele conversa comigo sobre a minha vida, monta metas e acompanha o progresso.',
      openSource: 'No futuro vou liberar o código como open source para quem quiser fazer algo parecido.',
      status: 'EM DESENVOLVIMENTO',
      chat: 'Conversar',
      chatAria: 'Abrir o chat com o Nube',
    },
    book: {
      label: 'LIVRO · NÃO FICÇÃO',
      title: 'Jovens e a Corrida pelo Dinheiro',
      desc: 'O desespero por sucesso na geração da pressa. Um olhar honesto sobre a geração que corre sem saber onde quer chegar, e o preço que paga por isso, em 3 partes e 13 capítulos.',
      status: 'PUBLICADO · LEITURA GRATUITA',
      read: 'Ler o livro',
      tags: ['LIVRO', 'NÃO FICÇÃO', 'COMPORTAMENTO'],
      alt: 'Capa do livro Jovens e a Corrida pelo Dinheiro, de Lucas Leuck',
    },
  },
  en: {
    heading: 'Featured projects',
    cta: 'See project details',
    nube: {
      label: 'PERSONAL ASSISTANT · AI',
      title: 'Nube',
      desc:
        'My personal assistant for everything. It is already connected to my Obsidian, where I keep what I do in college, at work, at the gym (diet and training) and even my finances. With a dashboard and a model running locally through the Ollama API, it talks with me about my life, builds goals and tracks progress.',
      openSource: 'In the future I will release the code as open source for anyone who wants to build something similar.',
      status: 'IN DEVELOPMENT',
      chat: 'Chat',
      chatAria: 'Open the chat with Nube',
    },
    book: {
      label: 'BOOK · NON-FICTION',
      title: 'Jovens e a Corrida pelo Dinheiro',
      desc: '“Youth and the Race for Money”: the desperation for success in the generation in a hurry. An honest look at a generation running without knowing where it wants to go, and the price it pays, in 3 parts and 13 chapters. Written in Portuguese.',
      status: 'PUBLISHED · FREE TO READ',
      read: 'Read the book',
      tags: ['BOOK', 'NON-FICTION', 'BEHAVIOR'],
      alt: 'Cover of the book Jovens e a Corrida pelo Dinheiro, by Lucas Leuck',
    },
  },
}

const NUBE_TAGS = ['OBSIDIAN', 'OLLAMA', 'DASHBOARD', 'LLM LOCAL']
export const EBOOK_URL = 'https://docs.google.com/document/d/1ZX7XrDxalbt19qlP34cvyzclXYiEiXaSa-QbcPVMP-o/edit?tab=t.0'

/** Pede para o Nube do canto abrir o chat */
const openNubeChat = () => window.dispatchEvent(new CustomEvent('nube:open'))

function BigTitle({ children }: { children: string }) {
  return (
    <h4 className="font-heading font-extrabold tracking-tighter leading-[0.85] text-5xl sm:text-6xl lg:text-7xl text-white">
      {children}
      <span className="inline-block w-[0.16em] h-[0.16em] rounded-full bg-gradient-to-br from-white to-chrome-400 ml-[0.04em] align-baseline" />
    </h4>
  )
}

export default function FeaturedProject({ currentLanguage }: { currentLanguage: Language }) {
  const c = COPY[currentLanguage]
  return (
    <div className="mb-24">
      {/* cabeçalho */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-8"
      >
        {c.heading}
      </motion.h3>

      {/* projeto principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative mb-6"
      >
        {/* nuvenzinha sentada na borda do card */}
        <motion.div
          className="absolute -top-7 right-10 z-10 hidden sm:block"
          animate={{ y: [0, -4, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <MiniCloud size={40} />
        </motion.div>

        <Link
          href={P.detailsUrl}
          className="group grid md:grid-cols-2 border border-white/15 hover:border-white/30 transition-colors duration-300 bg-white/[0.015]"
        >
          <div className="relative flex items-center justify-center p-10 sm:p-14 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]">
            {/* capa 2x2: as 4 etapas do pipeline (original, máscara / segmentada, lesões) */}
            <div
              role="img"
              aria-label={
                currentLanguage === 'pt'
                  ? 'Etapas do pipeline: folha original, máscara da folha, folha segmentada e lesões detectadas'
                  : 'Pipeline steps: original leaf, leaf mask, segmented leaf and detected lesions'
              }
              className="relative w-full max-w-[300px] grid grid-cols-2 gap-1.5 p-1.5 rounded-xl bg-white/[0.04] ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] group-hover:scale-[1.03] transition-transform duration-700"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-no-repeat"
                  style={{
                    backgroundImage: `url(${P.coverStrip})`,
                    backgroundSize: '400% 100%',
                    backgroundPosition: `${(i * 100) / 3}% 50%`,
                  }}
                />
              ))}
              <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest bg-black/65 text-chrome-100 px-2 py-1 rounded">
                {currentLanguage === 'pt' ? 'PIPELINE · 4 ETAPAS' : 'PIPELINE · 4 STEPS'}
              </span>
            </div>
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.02]">
            <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-4">{P.label[currentLanguage]}</p>
            <h4 className="text-3xl font-heading font-bold tracking-tight mb-4">{P.title[currentLanguage]}</h4>
            <p className="text-dim text-sm leading-relaxed mb-6">{P.description[currentLanguage]}</p>
            <div className="flex flex-wrap gap-2 mb-7">
              {P.technologies.map((t) => (
                <span key={t} className="font-mono text-[11px] tracking-wider px-3 py-1.5 border border-white/15 text-foreground/80">
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold chrome-text">
              {c.cta}
              <ArrowUpRight size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </motion.div>

      {/* mais dois destaques */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nube */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group flex flex-col border border-white/15 hover:border-white/30 transition-colors bg-white/[0.015]"
        >
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <img
              src="/projetos/nube/nube.webp"
              alt={currentLanguage === 'pt' ? 'Nube, uma nuvem de pelúcia de boné e correntinha' : 'Nube, a plush cloud with a cap and a chain'}
              className="absolute inset-0 w-full h-full object-cover object-[50%_35%] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <p className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.2em] text-white bg-black/55 backdrop-blur-sm px-2 py-1">
              {c.nube.label}
            </p>
            <Link
              href="/projetos/nube"
              aria-label={c.cta}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-white/40 bg-black/40 backdrop-blur-sm text-white hover:bg-white hover:text-background transition-colors"
            >
              <ArrowUpRight size={16} />
            </Link>
            <div className="absolute bottom-5 left-6">
              <BigTitle>NUBE</BigTitle>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7 border-t border-white/10">
            <h4 className="text-2xl font-heading font-bold tracking-tight mb-3">{c.nube.title}</h4>
            <p className="text-sm text-dim leading-relaxed mb-3">{c.nube.desc}</p>
            <p className="text-sm text-foreground/85 leading-relaxed mb-5">{c.nube.openSource}</p>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-chrome-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              {c.nube.status} · OPEN SOURCE
            </p>
            <Link href="/projetos/nube" className="group/link inline-flex w-fit items-center gap-2 text-sm font-semibold chrome-text mb-5">
              {c.cta}
              <ArrowUpRight size={15} className="text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {NUBE_TAGS.map((t) => (
                  <span key={t} className="font-mono text-[11px] tracking-wider px-3 py-1.5 border border-white/15 text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={openNubeChat}
                className="inline-flex items-center gap-3 px-5 py-3 border border-white/30 text-sm font-semibold hover:bg-white hover:text-background transition-colors"
              >
                <MessageCircle size={15} />
                {c.nube.chat}
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </motion.article>

        {/* Livro */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group flex flex-col border border-white/15 hover:border-white/30 transition-colors bg-white/[0.015]"
        >
          <Link href="/projetos/livro" className="relative block h-64 sm:h-72 overflow-hidden bg-[#d9d9d9]">
            <img
              src="/projetos/ebook/capa.webp"
              alt={c.book.alt}
              className="absolute inset-0 w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-700"
            />
            <p className="absolute top-5 right-16 font-mono text-[11px] tracking-[0.2em] text-white bg-black/55 backdrop-blur-sm px-2 py-1">
              {c.book.label}
            </p>
            <span className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-black/30 bg-black/40 backdrop-blur-sm text-white group-hover:bg-white group-hover:text-background transition-colors">
              <ArrowUpRight size={16} />
            </span>
          </Link>

          <div className="flex flex-1 flex-col p-6 sm:p-7 border-t border-white/10">
            <h4 className="text-2xl font-heading font-bold tracking-tight mb-3">{c.book.title}</h4>
            <p className="text-sm text-dim leading-relaxed mb-5">{c.book.desc}</p>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-chrome-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {c.book.status}
            </p>
            <Link href="/projetos/livro" className="group/link inline-flex w-fit items-center gap-2 text-sm font-semibold chrome-text mb-5">
              {c.cta}
              <ArrowUpRight size={15} className="text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {c.book.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] tracking-wider px-3 py-1.5 border border-white/15 text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 border border-white/30 text-sm font-semibold hover:bg-white hover:text-background transition-colors"
              >
                {c.book.read}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  )
}
