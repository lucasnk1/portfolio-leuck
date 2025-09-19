'use client'

import { Download } from 'lucide-react'
import { motion } from 'framer-motion'

const ResumeDownload = () => {
  const handleDownload = () => {
    
    const pdfUrl = '/resume-lucas-leuck.pdf' 
    
    // Criar um link temporário para download
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Lucas_Leuck_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-400 text-foreground rounded-lg transition-colors duration-200"
    >
      <Download size={20} />
      <span>Download CV</span>
    </motion.button>
  )
}

export default ResumeDownload 