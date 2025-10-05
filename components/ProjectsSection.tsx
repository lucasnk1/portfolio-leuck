'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Language, translations } from '@/lib/i18n'
import ProjectCard from './ProjectCard'
import { ExternalLink } from 'lucide-react'

interface ProjectsSectionProps {
  currentLanguage: Language
}

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  learnMoreUrl?: string
}

const ProjectsSection = ({ currentLanguage }: ProjectsSectionProps) => {
  const t = translations[currentLanguage]
  const [activeTab, setActiveTab] = useState<'academic' | 'personal'>('academic')
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)

  // Agora: Acadêmicos
  const academicProjects: Project[] = [
    {
      title: "Manipulação de Dados de Candidatos",
      description: "Sistema em python manipulando três grandes bases de dados de candidatos do Rio Grande do Sul usando listas encadeadas para algumas consultas",
      technologies: ["Python", "csv", "ipynb"],
      githubUrl: "https://github.com/lucasnk1/TI1/tree/main",
    },
    {
      title: "Crawler Wikipedia e Grau de Separação",
      description: "Crawler na Wikipédia: programa que navega pelos links, identifica páginas de pessoas e salva o HTML. Depois, monta um grafo conectando pessoas por links diretos e usa BFS para mostrar o grau de separação e o caminho entre duas escolhidas.",
      technologies: ["HTML", "ipynb", "Python"],
      githubUrl: "https://github.com/lucasnk1/crawler-wikipedia",
    },
    {
      title: "Coleta de Dados do IMDB",
      description: "Web Scraping de dados do site IMDB (Internet Movie Database) utilizando a biblioteca Selenium para simular a navegação de um usuário real e contornar proteções básicas do site.",
      technologies: ["JSON", "Python"],
      githubUrl: "https://github.com/lucasnk1/Coleta-de-Dados-do-IMDB",
    },
    {
      title: "EDA do dataset Palmer Penguins ",
      description: "Análise exploratória de dados (EDA) e pré-processamento do dataset Palmer Penguins. Foco na identificação de features, tratamento de valores faltantes e análise de balanceamento de classes.",
      technologies: ["Python", "csv", "ipynb"],
      githubUrl: "https://github.com/lucasnk1/analise-dados-penguins",
    },
    {
      title: "API REST Pandas ClashDataset ",
      description: "API REST em Flask para manipulação e consulta (CRUD) de dados do dataset clash_wiki_dataset.csv com Pandas. Inclui script de consumo (requests) e coleção Postman para validação.",
      technologies: ["Python", "csv", "ipynb", "Flask", "Postman", "requests","Pandas","API REST"],
      githubUrl: "https://github.com/lucasnk1/API-REST-Pandas-ClashDataset",
    }
    // Adicione mais projetos de programação aqui
  ]

  // Agora: Pessoais
  const personalProjects: Project[] = [
    {
      title: "eBook: JOVENS E A CORRIDA PELO DINHEIRO",
      description: "Um olhar honesto sobre a geração que corre sem saber onde quer chegar — e o preço que paga por isso.",
      technologies: [""],
      learnMoreUrl: "https://docs.google.com/document/d/1ZX7XrDxalbt19qlP34cvyzclXYiEiXaSa-QbcPVMP-o/edit?usp=sharing", 
    },
    // Adicione mais projetos acadêmicos aqui
  ]

  const tabs = [
    {
      id: 'academic' as const,
      label: 'Acadêmicos',
      count: academicProjects.length
    },
    {
      id: 'personal' as const,
      label: 'Pessoais',
      count: personalProjects.length
    }
  ]

  const getActiveProjects = () => {
    return activeTab === 'academic' ? academicProjects : personalProjects
  }

  // Lista duplicada para loop infinito (evita "roleta" vazia)
  const projectsLoop = useMemo(() => {
    const list = getActiveProjects()
    if (list.length === 0) return []
    return [...list, ...list, ...list]
  }, [activeTab, academicProjects, personalProjects])

  // Autoplay com requestAnimationFrame (fluxo contínuo esquerda -> direita)
  useEffect(() => {
    let raf: number
    const speedPxPerSec = 60 // ajuste de velocidade
    let prevTs = 0

    const step = (ts: number) => {
      if (!prevTs) prevTs = ts
      const dt = (ts - prevTs) / 1000
      prevTs = ts

      if (!isPaused) {
        const track = trackRef.current
        const container = containerRef.current
        if (track && container) {
          const containerWidth = container.getBoundingClientRect().width
          const trackWidth = track.scrollWidth
          // move para a esquerda
          let next = x.get() - speedPxPerSec * dt
          // quando metade do track passou, reseta para 0
          const resetThreshold = -(trackWidth / 3) // porque triplicamos os itens
          if (next <= resetThreshold) next = 0
          // evita "puxões" quando for muito maior que container
          if (trackWidth > containerWidth) {
            x.set(next)
          }
        }
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isPaused, activeTab])

  return (
    <section id="projetos" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.projects.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-secondary hover:text-foreground hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs bg-gray-800 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Roleta horizontal infinita */}
        <div
          ref={containerRef}
          className="relative overflow-x-hidden overflow-y-visible py-6"
          tabIndex={0}
          onKeyDown={(e) => {
            const step = 80
            if (e.key === 'ArrowLeft') {
              setIsPaused(true)
              x.set(x.get() + step)
            } else if (e.key === 'ArrowRight') {
              setIsPaused(true)
              x.set(x.get() - step)
            } else if (e.key === 'Escape') {
              setIsPaused(false)
            }
          }}
          onMouseLeave={() => {
            setHoveredIndex(null)
            setIsPaused(false)
          }}
        >
          {projectsLoop.length > 0 ? (
            <motion.div
              ref={trackRef}
              style={{ x }}
              drag="x"
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={() => setIsPaused(false)}
              className="flex gap-6 py-2"
            >
              {projectsLoop.map((project, idx) => {
                const isHovered = hoveredIndex === idx
                const isDimmed = hoveredIndex !== null && hoveredIndex !== idx
                return (
                  <motion.div
                    key={`${activeTab}-loop-${idx}`}
                    onMouseEnter={() => {
                      setHoveredIndex(idx)
                      setIsPaused(true)
                    }}
                    onFocus={() => {
                      setHoveredIndex(idx)
                      setIsPaused(true)
                    }}
                    onBlur={() => {
                      setHoveredIndex((current) => (current === idx ? null : current))
                      setIsPaused(false)
                    }}
                    className={`shrink-0 w-[320px] md:w-[360px] ${isHovered ? 'relative z-10' : ''}`}
                    tabIndex={0}
                    animate={{
                      scale: isHovered ? 1.07 : 1,
                      filter: isHovered ? 'brightness(1.15)' : 'brightness(0.85)',
                      opacity: isDimmed ? 0.65 : 1
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <div className={isHovered ? 'ring-2 ring-primary/70 rounded-xl shadow-lg' : ''}>
                      <ProjectCard
                        {...project}
                        index={idx % (getActiveProjects().length || 1)}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📁</div>
              <p className="text-secondary">
                {currentLanguage === 'pt' ? 'Nenhum projeto nesta categoria ainda.' : 'No projects in this category yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Empty State global removido; agora mostramos por aba quando vazia */}
      </div>
    </section>
  )
}

export default ProjectsSection
