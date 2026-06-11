export type Language = 'pt' | 'en'

export interface Translations {
  nav: {
    home: string
    about: string
    projects: string
    skills: string
    certificates: string
    contact: string
  }
  home: {
    title: string
    subtitle: string
    downloadCV: string
    learnMore: string
  }
  about: {
    title: string
    description: string
    python: string
    pythonDesc: string
    powerBI: string
    powerBIDesc: string
    aiML: string
    aiMLDesc: string
  }
  projects: {
    title: string
    programming: string
    academic: string
  }
  certificates: {
    title: string
    subtitle: string
    viewCertificate: string
    searchPlaceholder: string
    emptyState: string
    loadError: string
    stats: {
      totalCertificates: string
      totalInstitutions: string
      totalCategories: string
    }
  }
  skills: {
    title: string
    dataScience: string
    dataAnalytics: string
    programming: string
    mathematics: string
    otherTools: string
  }
  contact: {
    title: string
    subtitle: string
    linkedin: string
    github: string
    email: string
  }
  footer: {
    madeWith: string
    by: string
    copyright: string
  }
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: 'Home',
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Habilidades',
      certificates: 'Certificados',
      contact: 'Contato'
    },
    home: {
      title: 'Lucas Leuck de Oliveira',
      subtitle: 'Estudante de Ciência de Dados & IA | Python | Power BI | Entusiasta de Automação',
      downloadCV: 'Baixar CV',
      learnMore: 'Saiba mais'
    },
    about: {
      title: 'Sobre Mim',
      description: 'Sou estudante de Ciência de Dados com interesse em Inteligência Artificial, Automação e Negócios. Gosto de criar soluções com Python e explorar dados com Power BI.',
      python: 'Python',
      pythonDesc: 'Desenvolvimento e automação',
      powerBI: 'Power BI',
      powerBIDesc: 'Análise e visualização',
      aiML: 'AI/ML',
      aiMLDesc: 'Machine Learning'
    },
    projects: {
      title: 'Projetos',
      programming: 'Projetos de Programação',
      academic: 'Projetos Acadêmicos'
    },
    certificates: {
      title: 'Certificados',
      subtitle: 'Cursos e certificações concluídos durante minha trajetória em tecnologia, ciência de dados e inteligência artificial.',
      viewCertificate: 'Visualizar Certificado',
      searchPlaceholder: 'Buscar certificado pelo nome...',
      emptyState: 'Nenhum certificado encontrado com os filtros atuais.',
      loadError: 'Não foi possível carregar os certificados no momento.',
      stats: {
        totalCertificates: 'Total de certificados',
        totalInstitutions: 'Total de instituições',
        totalCategories: 'Categorias estudadas'
      }
    },
    skills: {
      title: 'Habilidades',
      dataScience: 'Ciência de Dados',
      dataAnalytics: 'Análise de Dados & BI',
      programming: 'Linguagens de Programação',
      mathematics: 'Matemática',
      otherTools: 'Outros'
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos conversar! Entre em contato através de qualquer uma das plataformas abaixo.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      email: 'Email'
    },
    footer: {
      madeWith: 'Feito com',
      by: 'por Lucas Leuck',
      copyright: '© 2025 Lucas Leuck de Oliveira. Todos os direitos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      certificates: 'Certificates',
      contact: 'Contact'
    },
    home: {
      title: 'Lucas Leuck de Oliveira',
      subtitle: 'Data Science & AI Student | Python | Power BI | Automation Enthusiast',
      downloadCV: 'Download CV',
      learnMore: 'Learn More'
    },
    about: {
      title: 'About Me',
      description: 'I am a Data Science student with interest in Artificial Intelligence, Automation and Business. I like to create solutions with Python and explore data with Power BI.',
      python: 'Python',
      pythonDesc: 'Development and automation',
      powerBI: 'Power BI',
      powerBIDesc: 'Analysis and visualization',
      aiML: 'AI/ML',
      aiMLDesc: 'Machine Learning'
    },
    projects: {
      title: 'Projects',
      programming: 'Programming Projects',
      academic: 'Academic Projects'
    },
    certificates: {
      title: 'Certificates',
      subtitle: 'Courses and certifications completed during my journey in technology, data science and artificial intelligence.',
      viewCertificate: 'View Certificate',
      searchPlaceholder: 'Search certificates by name...',
      emptyState: 'No certificates found with the current filters.',
      loadError: 'Could not load certificates at this time.',
      stats: {
        totalCertificates: 'Total certificates',
        totalInstitutions: 'Total institutions',
        totalCategories: 'Studied categories'
      }
    },
    skills: {
      title: 'Skills',
      dataScience: 'Data Science',
      dataAnalytics: 'Data Analytics & BI',
      programming: 'Programming Languages',
      mathematics: 'Mathematics',
      otherTools: 'Others'
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's talk! Get in touch through any of the platforms below.",
      linkedin: 'LinkedIn',
      github: 'GitHub',
      email: 'Email'
    },
    footer: {
      madeWith: 'Made with',
      by: 'by Lucas Leuck',
      copyright: '© 2025 Lucas Leuck de Oliveira. All rights reserved.'
    }
  }
} 