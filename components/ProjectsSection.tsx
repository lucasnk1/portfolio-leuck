'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Language, translations } from '@/lib/i18n'
import { ACADEMIC_PROJECTS, PERSONAL_PROJECTS } from '@/lib/projects'
import ProjectCard from './ProjectCard'
import FeaturedProject from './FeaturedProject'

interface ProjectsSectionProps {
  currentLanguage: Language
}

const SECTION_COPY = {
  pt: { eyebrow: 'OUTROS PROJETOS', heading: 'Mais do que eu construí.', academic: 'Acadêmicos', personal: 'Pessoais' },
  en: { eyebrow: 'OTHER PROJECTS', heading: 'More of what I’ve built.', academic: 'Academic', personal: 'Personal' },
}

const ProjectsSection = ({ currentLanguage }: ProjectsSectionProps) => {
  const copy = SECTION_COPY[currentLanguage]
  const t = translations[currentLanguage]
  const [activeTab, setActiveTab] = useState<'academic' | 'personal'>('academic')
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)

  // Projetos cadastrados manualmente em lib/projects.ts
  const academicProjects = ACADEMIC_PROJECTS
  const personalProjects = PERSONAL_PROJECTS

  const tabs = [
    { id: 'academic' as const, label: copy.academic, count: academicProjects.length },
    { id: 'personal' as const, label: copy.personal, count: personalProjects.length },
  ]

  const activeProjects = activeTab === 'academic' ? academicProjects : personalProjects

  // Lista triplicada para loop infinito (evita "roleta" vazia)
  const projectsLoop = useMemo(
    () => (activeProjects.length === 0 ? [] : [...activeProjects, ...activeProjects, ...activeProjects]),
    [activeProjects],
  )

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
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">{t.projects.title}</h2>
          <div className="divider-chrome w-24 mx-auto"></div>
        </motion.div>

        {/* Projeto em destaque */}
        <FeaturedProject currentLanguage={currentLanguage} />

        {/* Outros projetos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-dim mb-3">{copy.eyebrow}</p>
          <h3 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">{copy.heading}</h3>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-card rounded-xl p-1.5 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/[0.1] text-foreground shadow-lg border border-white/[0.08]'
                    : 'text-dim hover:text-foreground hover:bg-white/[0.03]'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-white/[0.1] text-foreground' 
                    : 'bg-white/[0.05] text-dim'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Roleta horizontal infinita */}
        <div
          ref={containerRef}
          className="relative overflow-x-hidden overflow-y-visible py-6 carousel-mask"
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
                      scale: isHovered ? 1.05 : 1,
                      opacity: isDimmed ? 0.5 : 1
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <div className={isHovered ? 'ring-1 ring-white/[0.15] rounded-xl' : ''}>
                      <ProjectCard
                        {...project}
                        description={project.description[currentLanguage]}
                        language={currentLanguage}
                        index={idx % (activeProjects.length || 1)}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📁</div>
              <p className="text-dim">
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
