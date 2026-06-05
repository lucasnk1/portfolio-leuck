'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsData } from '@/lib/skills'
import SkillCard from './SkillCard'
import { Language, translations } from '@/lib/i18n'
import { X, ChevronDown, Folder } from 'lucide-react'

interface SkillsSectionProps {
  currentLanguage: Language
}

const SkillsSection = ({ currentLanguage }: SkillsSectionProps) => {
  const t = translations[currentLanguage]
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName)
    setProgress(0)
  }

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle)
    } else {
      newExpanded.add(categoryTitle)
    }
    setExpandedCategories(newExpanded)
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
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">{t.skills.title}</h2>
          <div className="divider-chrome w-24 mx-auto"></div>
        </motion.div>
        
        <div className="space-y-4 max-w-6xl mx-auto">
          {skillsData.map((category, categoryIndex) => {
            const isExpanded = expandedCategories.has(category.title[currentLanguage])
            
            return (
              <motion.div
                key={category.title[currentLanguage]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.title[currentLanguage])}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                      <Folder 
                        size={18} 
                        className={`transition-colors duration-300 ${
                          isExpanded ? 'text-foreground' : 'text-dim'
                        }`} 
                      />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground tracking-tight">
                      {category.title[currentLanguage]}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-white/[0.05] text-dim text-xs rounded-full border border-white/[0.06]">
                      {category.skills.length}
                    </span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-dim transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Category Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <div className="divider-chrome mb-6"></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Skill Description Panel */}
        <AnimatePresence>
          {activeSkillData && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-1/2 right-8 transform -translate-y-1/2 w-80 glass-card-strong rounded-xl p-6 shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                    <activeSkillData.icon size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">{activeSkillData.name}</h3>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-dim hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-dim text-sm leading-relaxed mb-4">
                {activeSkillData.description[currentLanguage]}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/[0.05] rounded-full h-0.5">
                <motion.div
                  className="bg-gradient-to-r from-white/40 to-white/10 h-0.5 rounded-full"
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