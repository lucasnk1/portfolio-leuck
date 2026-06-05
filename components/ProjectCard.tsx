'use client'

import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  learnMoreUrl?: string
  imageUrl?: string
  imageAlt?: string
  index: number
}

const ProjectCard = ({ title, description, technologies, githubUrl, liveUrl, learnMoreUrl, imageUrl, imageAlt, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card rounded-xl p-6 card-hover group"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {imageUrl && (
            <div className="w-full mb-5 overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={imageAlt || title}
                className="w-full max-h-[520px] object-contain pointer-events-none select-none group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          )}
          <h3 className="text-xl font-heading font-semibold text-foreground mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-dim text-sm mb-5 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-white/[0.05] text-dim text-xs rounded-full font-mono border border-white/[0.06] hover:border-white/[0.12] hover:text-foreground transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chrome flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
            >
              <ExternalLink size={14} />
              <span>Demo</span>
            </a>
          )}

          {learnMoreUrl && (
            <a
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
            >
              <ExternalLink size={14} />
              <span>Saiba mais</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard