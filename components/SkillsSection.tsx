'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsData } from '@/lib/skills'
import SkillCard from './SkillCard'
import { Language, translations } from '@/lib/i18n'
import { X } from 'lucide-react'

interface SkillsSectionProps {
  currentLanguage: Language
}

const SkillsSection = ({ currentLanguage }: SkillsSectionProps) => {
  const t = translations[currentLanguage]
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName)
    setProgress(0)
  }

  const getActiveSkill = () => {
    if (!activeSkill) return null
    
    for (const category of skillsData) {
      const skill = category.skills.find(s => s.name === activeSkill)
      if (skill) return skill
    }
    return null
  }

  const activeSkillData = getActiveSkill()

  // Auto-close timer with progress bar
  useEffect(() => {
    if (activeSkill) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setActiveSkill(null)
            return 0
          }
          return prev + 2 // 2% every 100ms = 5 seconds total
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [activeSkill])

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.skills.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>
        
        <div className="space-y-12">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title[currentLanguage]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                {category.title[currentLanguage]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    currentLanguage={currentLanguage}
                    onSkillClick={handleSkillClick}
                    isActive={activeSkill === skill.name}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Description Panel */}
        <AnimatePresence>
          {activeSkillData && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-1/2 right-8 transform -translate-y-1/2 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg p-6 shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <activeSkillData.icon size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{activeSkillData.name}</h3>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-secondary hover:text-foreground transition-colors p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                {activeSkillData.description[currentLanguage]}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-1">
                <motion.div
                  className="bg-gradient-to-r from-primary to-accent h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SkillsSection 