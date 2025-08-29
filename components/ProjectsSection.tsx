'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [activeTab, setActiveTab] = useState<'programming' | 'academic'>('programming')

  const programmingProjects: Project[] = [
    {
      title: "Manipulação de Dados de Candidatos",
      description: "Sistema em python manipulando três grandes bases de dados de candidatos do Rio Grande do Sul usando listas encadeadas para algumas consultas",
      technologies: ["Python", "csv", "ipynb"],
      githubUrl: "https://github.com/lucasnk1/TI1/tree/main",
    },
    // Adicione mais projetos de programação aqui
  ]

  const academicProjects: Project[] = [
   // {
      //title: "E2E – Estudante para Estudante",
      //description: "Projeto acadêmico focado em [descrição a ser adicionada]",
      //technologies: ["[Tecnologias a serem definidas]"],
     // learnMoreUrl: "#", // URL a ser definida
  //  },
    // Adicione mais projetos acadêmicos aqui
  ]

  const tabs = [
    {
      id: 'programming' as const,
      label: 'Programação',
      count: programmingProjects.length
    },
    {
      id: 'academic' as const,
      label: 'Acadêmico',
      count: academicProjects.length
    }
  ]

  const getActiveProjects = () => {
    return activeTab === 'programming' ? programmingProjects : academicProjects
  }

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

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getActiveProjects().map((project, index) => (
              <ProjectCard
                key={`${activeTab}-${index}`}
                {...project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {getActiveProjects().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📁</div>
            <p className="text-secondary text-lg">
              {currentLanguage === 'pt' 
                ? 'Nenhum projeto encontrado nesta categoria ainda.' 
                : 'No projects found in this category yet.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
