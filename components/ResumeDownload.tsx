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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="btn-chrome flex items-center gap-2 px-7 py-3.5 text-sm font-medium"
    >
      <Download size={18} />
      <span>Download CV</span>
    </motion.button>
  )
}

export default ResumeDownload