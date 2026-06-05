'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Skill } from '@/lib/skills'
import { Language } from '@/lib/i18n'

interface SkillCardProps {
  skill: Skill
  index: number
  currentLanguage: Language
  onSkillClick: (skillName: string) => void
  isActive: boolean
}

const SkillCard = ({ skill, index, currentLanguage, onSkillClick, isActive }: SkillCardProps) => {
  const IconComponent = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`skill-card glass-card rounded-xl p-5 cursor-pointer group ${
        isActive 
          ? 'border-white/[0.15] shadow-lg shadow-white/[0.03]' 
          : ''
      }`}
      onClick={() => onSkillClick(skill.name)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-white/[0.08] transition-all duration-300">
          <IconComponent size={24} className="text-dim group-hover:text-foreground transition-colors duration-300" />
        </div>
        <h3 className="font-medium text-sm text-dim group-hover:text-foreground transition-colors duration-300">{skill.name}</h3>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full shadow-sm shadow-white/30"
        />
      )}
    </motion.div>
  )
}

export default SkillCard