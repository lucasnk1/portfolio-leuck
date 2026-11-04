'use client'

import { motion } from 'framer-motion'
import { Language, translations } from '@/lib/i18n'

/**
 * Seção "Sobre": texto em primeira pessoa + linha do tempo da trajetória.
 * Os itens vêm do currículo (public/resume-lucas-leuck.pdf); edite abaixo.
 */

interface Step {
  period: Record<Language, string>
  title: Record<Language, string>
  detail: Record<Language, string>
  current?: boolean
}

const PARAGRAPHS: Record<Language, string[]> = {
  pt: [
    'Sou estudante de Ciência de Dados e Inteligência Artificial na PUCRS e direciono minha carreira para IA, automação e análise de dados, com foco em Python, Power BI e SQL.',
    'Gosto de entender um problema de ponta a ponta: coletar e tratar os dados, construir a solução e, principalmente, avaliar com honestidade onde ela falha. Hoje levo isso para o estágio em Automação, Dados e IA na LPDB Advogados, e para projetos pessoais como o Nube, meu assistente com IA.',
  ],
  en: [
    'I am a Data Science and Artificial Intelligence student at PUCRS, steering my career toward AI, automation and data analysis, with a focus on Python, Power BI and SQL.',
    'I like understanding a problem end to end: collecting and preparing the data, building the solution and, above all, being honest about where it fails. Today I bring that to my Automation, Data & AI internship at LPDB Advogados, and to personal projects like Nube, my AI assistant.',
  ],
}

const STEPS: Step[] = [
  {
    period: { pt: 'MAI 2026 – ATUAL', en: 'MAY 2026 – NOW' },
    title: { pt: 'Automation, Data & AI Intern', en: 'Automation, Data & AI Intern' },
    detail: {
      pt: 'LPDB Advogados Associados · Automação de processos, pipelines de dados, integração de sistemas e soluções com IA',
      en: 'LPDB Advogados Associados · Process automation, data pipelines, system integration and AI solutions',
    },
    current: true,
  },
  {
    period: { pt: 'MAI 2026 – ATUAL', en: 'MAY 2026 – NOW' },
    title: { pt: 'Legal Ops Intern', en: 'Legal Ops Intern' },
    detail: {
      pt: 'LPDB Advogados Associados · Pesquisas cadastrais, validação de dados e documentos e controles operacionais',
      en: 'LPDB Advogados Associados · Background research, data and document validation and operational controls',
    },
    current: true,
  },
  {
    period: { pt: 'ATÉ 2028', en: 'UNTIL 2028' },
    title: { pt: 'Bacharelado em Ciência de Dados e IA', en: "Bachelor's in Data Science and AI" },
    detail: {
      pt: 'Pontifícia Universidade Católica do Rio Grande do Sul · PUCRS · Formatura prevista para 2028',
      en: 'Pontifical Catholic University of Rio Grande do Sul · PUCRS · Graduating in 2028',
    },
  },
  {
    period: { pt: 'MAR 2025', en: 'MAR 2025' },
    title: { pt: 'Sports Event Operations Assistant', en: 'Sports Event Operations Assistant' },
    detail: {
      pt: 'Skate Total Urbe · STU Pro Tour 2025 · Inglês com atletas e imprensa, credenciamento e controle de acesso no Excel',
      en: 'Skate Total Urbe · STU Pro Tour 2025 · English with athletes and press, accreditation and access control in Excel',
    },
  },
  {
    period: { pt: '2019 – 2021', en: '2019 – 2021' },
    title: { pt: 'Full-Stack & Designer · Fiverr', en: 'Full-Stack & Designer · Fiverr' },
    detail: {
      pt: 'Designs para lojas virtuais e materiais digitais no Photoshop e Canva, com clientes nacionais e internacionais',
      en: 'Designs for online stores and digital materials in Photoshop and Canva, for clients in Brazil and abroad',
    },
  },
]

export default function AboutSection({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage]
  const lang = currentLanguage

  return (
    <section id="sobre" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">{t.about.title}</h2>
          <div className="divider-chrome w-24 mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {PARAGRAPHS[lang].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-base sm:text-lg text-dim leading-relaxed mb-6 font-light"
            >
              {p}
            </motion.p>
          ))}

          <div className="h-px bg-white/[0.08] my-12" />

          <p className="font-mono text-xs tracking-[0.2em] text-chrome-300 mb-8">{lang === 'pt' ? 'TRAJETÓRIA' : 'JOURNEY'}</p>

          <ol className="relative">
            {/* linha vertical da linha do tempo */}
            <motion.span
              className="absolute left-[5px] top-2 bottom-2 w-px bg-white/15 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              aria-hidden="true"
            />
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title.pt}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1 pb-9 last:pb-0"
              >
                <div className="flex items-start gap-5 sm:gap-6 row-span-2 sm:row-span-1">
                  <span
                    className={`relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border ${
                      s.current
                        ? 'border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                        : 'border-chrome-400 bg-background'
                    }`}
                  />
                  <span className="hidden sm:block font-mono text-xs tracking-[0.15em] text-chrome-300 pt-0.5 whitespace-nowrap">
                    {s.period[lang]}
                  </span>
                </div>
                <div>
                  <span className="sm:hidden block font-mono text-[11px] tracking-[0.15em] text-chrome-400 mb-1">{s.period[lang]}</span>
                  <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg leading-snug">{s.title[lang]}</h3>
                  <p className="text-sm text-dim mt-1 leading-relaxed">{s.detail[lang]}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
