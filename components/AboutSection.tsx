'use client'

import { motion } from 'framer-motion'
import { Language, translations } from '@/lib/i18n'

/**
 * Seção "Sobre": texto em primeira pessoa + linha do tempo da trajetória.
 * Os itens vêm do currículo (public/resume-lucas-leuck.pdf); edite abaixo.
 */

interface Org {
  name: string
  logo: string
  linkedin: string
  /** 'cover' para logos quadradas com fundo próprio; 'contain' para brasões/logos altas */
  fit: 'cover' | 'contain'
}

interface Step {
  period: Record<Language, string>
  title: Record<Language, string>
  detail: Record<Language, string>
  /** sem org = sem logo (ex.: segunda vaga na mesma empresa) */
  org?: Org
  current?: boolean
}

const ORGS = {
  lpdb: {
    name: 'LPDB Advogados Associados',
    logo: '/logos/trajetoria/lpdb.png',
    linkedin: 'https://www.linkedin.com/company/lpdbadvogados/home/',
    fit: 'cover',
  },
  stu: {
    name: 'Skate Total Urbe',
    logo: '/logos/trajetoria/stu.png',
    linkedin: 'https://www.linkedin.com/company/skate-total-urbe/home/',
    fit: 'cover',
  },
  pucrs: {
    name: 'PUCRS',
    logo: '/logos/trajetoria/pucrs.png',
    linkedin: 'https://www.linkedin.com/school/pucrs/posts/',
    fit: 'contain',
  },
  fiverr: {
    name: 'Fiverr',
    logo: '/logos/trajetoria/fiverr.png',
    linkedin: 'https://www.linkedin.com/company/fiverr-com/posts/',
    fit: 'cover',
  },
} satisfies Record<string, Org>

/** Logo da empresa: preto e branco, ganha a cor original no hover e abre o LinkedIn */
function OrgLogo({ org, lang }: { org: Org; lang: Language }) {
  return (
    <a
      href={org.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === 'pt' ? `LinkedIn de ${org.name}` : `${org.name} on LinkedIn`}
      title={org.name}
      className={`group/logo relative z-10 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:ring-white/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)] ${
        org.fit === 'contain' ? 'bg-white p-1' : 'bg-chrome-900'
      }`}
    >
      <img
        src={org.logo}
        alt={org.name}
        loading="lazy"
        className={`h-full w-full ${org.fit === 'contain' ? 'object-contain' : 'object-cover'} grayscale opacity-70 transition-[filter,opacity,transform] duration-500 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-105`}
      />
    </a>
  )
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
    org: ORGS.lpdb,
    current: true,
  },
  {
    period: { pt: 'MAI 2026 – ATUAL', en: 'MAY 2026 – NOW' },
    title: { pt: 'Legal Ops Intern', en: 'Legal Ops Intern' },
    detail: {
      pt: 'LPDB Advogados Associados · Pesquisas cadastrais, validação de dados e documentos e controles operacionais',
      en: 'LPDB Advogados Associados · Background research, data and document validation and operational controls',
    },
    org: ORGS.lpdb,
    current: true,
  },
  {
    period: { pt: 'MAR 2025', en: 'MAR 2025' },
    title: { pt: 'Sports Event Operations Assistant', en: 'Sports Event Operations Assistant' },
    detail: {
      pt: 'Skate Total Urbe · STU Pro Tour 2025 · Inglês com atletas e imprensa, credenciamento e controle de acesso no Excel',
      en: 'Skate Total Urbe · STU Pro Tour 2025 · English with athletes and press, accreditation and access control in Excel',
    },
    org: ORGS.stu,
  },
  {
    period: { pt: '2024 – 2028', en: '2024 – 2028' },
    title: { pt: 'Bacharelado em Ciência de Dados e IA', en: "Bachelor's in Data Science and AI" },
    detail: {
      pt: 'Pontifícia Universidade Católica do Rio Grande do Sul · PUCRS · Formatura prevista para 2028',
      en: 'Pontifical Catholic University of Rio Grande do Sul · PUCRS · Graduating in 2028',
    },
    org: ORGS.pucrs,
    current: true, // ainda cursando
  },
  {
    period: { pt: '2019 – 2021', en: '2019 – 2021' },
    title: { pt: 'Full-Stack & Designer', en: 'Full-Stack & Designer' },
    detail: {
      pt: 'Fiverr · Designs para lojas virtuais e materiais digitais no Photoshop e Canva, com clientes nacionais e internacionais',
      en: 'Fiverr · Designs for online stores and digital materials in Photoshop and Canva, for clients in Brazil and abroad',
    },
    org: ORGS.fiverr,
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
              className="absolute left-[5px] top-5 bottom-5 w-px bg-white/15 origin-top"
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
                className="relative flex items-start gap-4 sm:gap-5 pb-9 last:pb-0"
              >
                {/* pontinho da linha do tempo */}
                <span
                  className={`relative z-10 mt-[17px] h-[11px] w-[11px] shrink-0 rounded-full border ${
                    s.current
                      ? 'border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                      : 'border-chrome-400 bg-background'
                  }`}
                />
                {/* logo da empresa ao lado do pontinho */}
                {s.org ? <OrgLogo org={s.org} lang={lang} /> : <span className="w-11 shrink-0" aria-hidden="true" />}
                <div className="flex-1 min-w-0 grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-1">
                  <span className="font-mono text-[11px] sm:text-xs tracking-[0.15em] text-chrome-400 sm:text-chrome-300 sm:pt-3 whitespace-nowrap">
                    {s.period[lang]}
                  </span>
                  <div className="sm:pt-2">
                    <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg leading-snug">{s.title[lang]}</h3>
                    <p className="text-sm text-dim mt-1 leading-relaxed">{s.detail[lang]}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
