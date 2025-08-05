'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import ResumeDownload from '@/components/ResumeDownload'
import ContactButton from '@/components/ContactButton'
import SkillsSection from '@/components/SkillsSection'

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt')
  const t = translations[currentLanguage]

  const projects = [
    {
      title: "Manipulação de Dados de Candidatos",
      description: "Sistema em pyhon manipulando três grandes bases de dados de candidatos do Rio Grande do Sul usando listas encadeadas para algumas consultas",
      technologies: ["Python", "Pandas", "csv", "ipynb"],
      githubUrl: "https://github.com/lucasnk1/TI1/tree/main",
    },
   // {
      //title: "Automação de Processos",
      //description: "Sistema de automação para processos empresariais, incluindo extração de dados, processamento automatizado e geração de relatórios. Reduziu o tempo de processamento em 80%.",
      //technologies: ["Python", "Selenium", "OpenPyXL", "Automation"],
      //githubUrl: "https://github.com/seu-usuario/automacao-processos"
      //liveUrl: "https://demo-analise-dados.vercel.app"
   // },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      
      {/* Home Section */}
      <section id="home" className="section-padding min-h-screen flex items-center justify-center">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Lucas Leuck"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para quando a imagem não carregar
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span class="text-4xl font-bold text-primary">LL</span>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              {t.home.title}
            </h1>
            <p className="text-xl sm:text-2xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ContactButton currentLanguage={currentLanguage} />
              <ResumeDownload />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.about.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-secondary leading-relaxed mb-8">
              {t.about.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.about.python}</div>
                <p className="text-secondary">{t.about.pythonDesc}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.about.powerBI}</div>
                <p className="text-secondary">{t.about.powerBIDesc}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{t.about.aiML}</div>
                <p className="text-secondary">{t.about.aiMLDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projetos Section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection currentLanguage={currentLanguage} />

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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-secondary mb-8">
              {t.contact.subtitle}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="https://www.linkedin.com/in/lucas-leuck-a58332353/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors duration-200"
              >
                <Linkedin size={32} className="text-blue-500" />
                <span className="font-medium">{t.contact.linkedin}</span>
                <span className="text-sm text-secondary">lucasleuck</span>
              </a>
              
              <a
                href="https://github.com/lucasnk1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors duration-200"
              >
                <Github size={32} className="text-foreground" />
                <span className="font-medium">{t.contact.github}</span>
                <span className="text-sm text-secondary">lucasnk1</span>
              </a>
              
              <a
                href="mailto:lucas.oliveria014@edu.pucrs.br"
                className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors duration-200"
              >
                <Mail size={32} className="text-green-500" />
                <span className="font-medium">{t.contact.email}</span>
                <span className="text-sm text-secondary">lucas.oliveria014@edu.pucrs.br</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer currentLanguage={currentLanguage} />
    </main>
  )
} 