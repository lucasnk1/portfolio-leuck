'use client'

import { motion } from 'framer-motion'

interface SparkleDecorationProps {
  className?: string
  size?: number
  delay?: number
  duration?: number
}

const SparkleDecoration = ({ className = '', size = 40, delay = 0, duration = 4 }: SparkleDecorationProps) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        opacity: [0.2, 0.8, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 4-point star / sparkle */}
        <path
          d="M50 0 C52 38, 62 48, 100 50 C62 52, 52 62, 50 100 C48 62, 38 52, 0 50 C38 48, 48 38, 50 0Z"
          fill="url(#sparkleGradient)"
        />
        <defs>
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4d4d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a3a3a3" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// Multiple sparkles composition for hero section
export const SparkleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <SparkleDecoration 
        className="top-[15%] right-[10%]" 
        size={50} 
        delay={0} 
        duration={5} 
      />
      <SparkleDecoration 
        className="top-[25%] left-[8%]" 
        size={30} 
        delay={1.5} 
        duration={6} 
      />
      <SparkleDecoration 
        className="bottom-[30%] right-[15%]" 
        size={24} 
        delay={2.5} 
        duration={4.5} 
      />
      <SparkleDecoration 
        className="top-[60%] left-[15%]" 
        size={20} 
        delay={3} 
        duration={5.5} 
      />
      <SparkleDecoration 
        className="top-[10%] left-[45%]" 
        size={18} 
        delay={1} 
        duration={7} 
      />
    </div>
  )
}

export default SparkleDecoration
