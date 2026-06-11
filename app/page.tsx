'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Zap, BarChart3, Brain } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'
import Header from '@/components/Header'
import ProjectsSection from '@/components/ProjectsSection'
import Footer from '@/components/Footer'
import ResumeDownload from '@/components/ResumeDownload'
import ContactButton from '@/components/ContactButton'
import SkillsSection from '@/components/SkillsSection'
import CertificatesSection from '@/components/CertificatesSection'
import { SparkleField } from '@/components/SparkleDecoration'

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt')
  const t = translations[currentLanguage]

  return (
    <main className="min-h-screen bg-background">
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      
      {/* Home Section */}
      <section id="home" className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Sparkle decorations */}
        <SparkleField />
        
        {/* Ambient glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Profile Photo */}
            <div className="mb-10 flex justify-center">
              <div className="profile-ring w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Lucas Leuck"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback para quando a imagem não carregar
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-chrome-900 flex items-center justify-center rounded-full">
                        <span class="text-4xl font-heading font-bold chrome-text">LL</span>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            <motion.h1 
              className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold mb-6 tracking-tight chrome-text-animated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t.home.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-dim mb-10 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t.home.subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <ContactButton currentLanguage={currentLanguage} />
              <ResumeDownload />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">{t.about.title}</h2>
            <div className="divider-chrome w-24 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-dim leading-relaxed mb-12 font-light">
              {t.about.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: t.about.python, desc: t.about.pythonDesc, icon: <Zap size={28} /> },
                { title: t.about.powerBI, desc: t.about.powerBIDesc, icon: <BarChart3 size={28} /> },
                { title: t.about.aiML, desc: t.about.aiMLDesc, icon: <Brain size={28} /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-8 text-center group flex flex-col items-center"
                >
                  <div className="mb-4 text-foreground bg-white/[0.04] p-3 rounded-lg group-hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:chrome-text transition-all duration-300">
                    {item.title}
                  </div>
                  <p className="text-dim text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projetos Section */}
      <ProjectsSection currentLanguage={currentLanguage} />

      {/* Skills Section */}
      <SkillsSection currentLanguage={currentLanguage} />

      {/* Certificados Section */}
      <CertificatesSection currentLanguage={currentLanguage} />

      {/* Contato Section */}
      <section id="contato" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">{t.contact.title}</h2>
            <div className="divider-chrome w-24 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-dim mb-10 font-light">
              {t.contact.subtitle}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <a
                href="https://www.linkedin.com/in/lucasleuck"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex flex-col items-center gap-4 p-8 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-300">
                  <Linkedin size={24} className="text-dim group-hover:text-foreground transition-colors duration-300" />
                </div>
                <span className="font-medium text-foreground">{t.contact.linkedin}</span>
                <span className="text-sm text-dim">lucas leuck</span>
              </a>
              
              <a
                href="https://github.com/lucasnk1"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex flex-col items-center gap-4 p-8 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-300">
                  <Github size={24} className="text-dim group-hover:text-foreground transition-colors duration-300" />
                </div>
                <span className="font-medium text-foreground">{t.contact.github}</span>
                <span className="text-sm text-dim">lucasnk1</span>
              </a>
              
              <a
                href="mailto:lucas.oliveria014@edu.pucrs.br"
                className="glass-card flex flex-col items-center gap-4 p-8 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-300">
                  <Mail size={24} className="text-dim group-hover:text-foreground transition-colors duration-300" />
                </div>
                <span className="font-medium text-foreground">{t.contact.email}</span>
                <span className="text-sm text-dim">lucas.oliveria014@edu.pucrs.br</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer currentLanguage={currentLanguage} />
    </main>
  )
}