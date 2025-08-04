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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`skill-card bg-gray-900/50 border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
        isActive 
          ? 'border-primary shadow-lg shadow-primary/20 glow-border' 
          : 'border-gray-800 hover:border-gray-600'
      }`}
      onClick={() => onSkillClick(skill.name)}
    >
      <div className="flex flex-col items-center text-center">
        <IconComponent size={32} className="text-primary mb-3" />
        <h3 className="font-medium text-foreground">{skill.name}</h3>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
        />
      )}
    </motion.div>
  )
}

export default SkillCard 