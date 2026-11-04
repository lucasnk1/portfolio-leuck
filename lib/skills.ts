import { 
  Code, 
  Database, 
  BarChart3, 
  Brain, 
  Calculator, 
  GitBranch,
  FileText,
  Globe,
  Cpu,
  Layers,
  PieChart,
  TrendingUp,
  Target,
  Network,
  Zap,
  Shield,
  Settings,
  Palette,
  Monitor,
  Smartphone,
  Server,
  Cloud,
  Lock,
  Search,
  Filter,
  BarChart,
  LineChart,
  ScatterChart,
  Activity,
  Database as DatabaseIcon,
  FileCode,
  Terminal,
  Box,
  Package,
  GitPullRequest,
  GitCommit,
  GitMerge,
  GitBranch as GitBranchIcon,
  GitPullRequest as GitPullRequestIcon,
  GitCommit as GitCommitIcon,
  GitMerge as GitMergeIcon,
  Atom,
  Cpu as CpuIcon,
  Zap as ZapIcon,
  Languages,
  Image,
  Palette as PaletteIcon,
  Briefcase,
  Eye,
  Bot,
  ListChecks,
  BookOpen,
  Send,
  Workflow,
  Boxes,
  Braces,
  Layout,
  Wind,
  Bug,
  Library,
  Sheet,
  ScanSearch,
  FlaskConical,
  Wand2
} from 'lucide-react'
import { Language } from './i18n'

export interface Skill {
  name: string
  icon: any
  description: Record<Language, string>
}

export interface SkillCategory {
  title: Record<Language, string>
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    title: {
      pt: 'Ciência de Dados',
      en: 'Data Science'
    },
    skills: [
      {
        name: 'Python',
        icon: Code,
        description: {
          pt: 'Linguagem de programação de propósito geral amplamente utilizada em ciência de dados.',
          en: 'A general-purpose programming language widely used in data science.'
        }
      },
      {
        name: 'Pandas',
        icon: BarChart3,
        description: {
          pt: 'Biblioteca Python para manipulação e análise de dados.',
          en: 'Python library for data manipulation and analysis.'
        }
      },
      {
        name: 'NumPy',
        icon: Calculator,
        description: {
          pt: 'Pacote fundamental para computação numérica com Python.',
          en: 'Fundamental package for numerical computing with Python.'
        }
      },
      {
        name: 'Jupyter Notebook',
        icon: FileText,
        description: {
          pt: 'Ambiente web para computação interativa.',
          en: 'Web-based environment for interactive computing.'
        }
      },
      {
        name: 'Generative AI',
        icon: Brain,
        description: {
          pt: 'Tecnologias de inteligência artificial que geram conteúdo criativo como texto, imagens e código.',
          en: 'Artificial intelligence technologies that generate creative content such as text, images, and code.'
        }
      },
      {
        name: 'Parallel & Distributed Processes',
        icon: Cpu,
        description: {
          pt: 'Fundamentos de processos paralelos e distribuídos, concorrência, programação paralela, semáforos e monitores.',
          en: 'Fundamentals of parallel and distributed processes, concurrency, parallel programming, semaphores, and monitors.'
        }
      }
    ]
  },
  {
    title: {
      pt: 'IA & Machine Learning',
      en: 'AI & Machine Learning'
    },
    skills: [
      {
        name: 'Machine Learning',
        icon: Brain,
        description: {
          pt: 'Modelos que aprendem padrões a partir de dados; usei SVM, Random Forest e MLP com validação cruzada.',
          en: 'Models that learn patterns from data; I have used SVM, Random Forest and MLP with cross-validation.'
        }
      },
      {
        name: 'scikit-learn',
        icon: FlaskConical,
        description: {
          pt: 'Biblioteca Python de machine learning: classificadores, pré-processamento, pipelines e métricas.',
          en: 'Python machine learning library: classifiers, preprocessing, pipelines and metrics.'
        }
      },
      {
        name: 'Computer Vision (OpenCV)',
        icon: Eye,
        description: {
          pt: 'Processamento e análise de imagens: segmentação, histogramas, morfologia e extração de características.',
          en: 'Image processing and analysis: segmentation, histograms, morphology and feature extraction.'
        }
      },
      {
        name: 'scikit-image',
        icon: ScanSearch,
        description: {
          pt: 'Biblioteca de processamento de imagens; usei para descritores de textura como GLCM e LBP.',
          en: 'Image processing library; I used it for texture descriptors like GLCM and LBP.'
        }
      },
      {
        name: 'LLMs & Ollama',
        icon: Bot,
        description: {
          pt: 'Modelos de linguagem rodando localmente com o Ollama, como no Nube, meu assistente pessoal.',
          en: 'Language models running locally with Ollama, as in Nube, my personal assistant.'
        }
      },
      {
        name: 'RAG',
        icon: Library,
        description: {
          pt: 'Retrieval-Augmented Generation: busca os trechos certos e gera respostas fundamentadas neles, com avaliação.',
          en: 'Retrieval-Augmented Generation: retrieves the right passages and grounds answers in them, with evaluation.'
        }
      },
      {
        name: 'Vector Databases',
        icon: Boxes,
        description: {
          pt: 'Bancos vetoriais como ChromaDB para busca por similaridade de embeddings.',
          en: 'Vector databases like ChromaDB for embedding similarity search.'
        }
      },
      {
        name: 'Prompt Engineering',
        icon: Wand2,
        description: {
          pt: 'Escrita de prompts claros e responsáveis para tirar o melhor dos modelos de IA.',
          en: 'Writing clear and responsible prompts to get the best out of AI models.'
        }
      }
    ]
  },
  {
    title: {
      pt: 'Análise de Dados & BI',
      en: 'Data Analytics & Business Intelligence'
    },
    skills: [
      {
        name: 'Power BI',
        icon: BarChart3,
        description: {
          pt: 'Ferramenta Microsoft para análise de negócios e visualização de dados.',
          en: 'Microsoft tool for business analytics and data visualization.'
        }
      },
      {
        name: 'Data Analytics',
        icon: TrendingUp,
        description: {
          pt: 'O processo de examinar conjuntos de dados para tirar conclusões.',
          en: 'The process of examining datasets to draw conclusions.'
        }
      },
      {
        name: 'Big Data',
        icon: Database,
        description: {
          pt: 'Conjuntos de dados grandes e complexos que requerem ferramentas avançadas para processamento.',
          en: 'Large and complex data sets that require advanced tools to process.'
        }
      },
      {
        name: 'Data Visualization',
        icon: PieChart,
        description: {
          pt: 'Representação gráfica de informações e dados.',
          en: 'Graphical representation of information and data.'
        }
      },
      {
        name: 'Business Intelligence (BI)',
        icon: Target,
        description: {
          pt: 'Tecnologias e estratégias para analisar informações de negócios.',
          en: 'Technologies and strategies for analyzing business information.'
        }
      },
      {
        name: 'Business Analytics (BA)',
        icon: Activity,
        description: {
          pt: 'Uso de dados e métodos estatísticos para impulsionar decisões de negócios.',
          en: 'Use of data and statistical methods to drive business decisions.'
        }
      },
      {
        name: 'SQL',
        icon: Database,
        description: {
          pt: 'Linguagem para consultar e manipular bancos de dados relacionais.',
          en: 'Language for querying and manipulating relational databases.'
        }
      },
      {
        name: 'Excel',
        icon: Sheet,
        description: {
          pt: 'Planilhas para organização, análise e controle de dados no dia a dia.',
          en: 'Spreadsheets for organizing, analyzing and controlling data day to day.'
        }
      },
      {
        name: 'Exploratory Data Analysis (EDA)',
        icon: Search,
        description: {
          pt: 'Exploração inicial dos dados: distribuições, valores faltantes e balanceamento de classes.',
          en: 'First look at the data: distributions, missing values and class balance.'
        }
      },
      {
        name: 'Web Scraping',
        icon: Bug,
        description: {
          pt: 'Coleta automatizada de dados da web com Selenium e crawlers.',
          en: 'Automated web data collection with Selenium and crawlers.'
        }
      },
      {
        name: 'Cluster Analysis',
        icon: Network,
        description: {
          pt: 'Um método estatístico para agrupar pontos de dados similares.',
          en: 'A statistical method to group similar data points.'
        }
      },
      { 
        name: 'Boolean Satisfiability Problem (SAT)',
        icon: Network,
        description: {
          pt: 'O problema consiste em determinar se existe alguma atribuição de valores verdadeiros ou falsos às variáveis de uma fórmula lógica que torne a fórmula verdadeira.',
          en: 'The problem consists of determining whether there is an assignment of true or false values to the variables of a logical formula that makes the formula true.'
        }
      }

    ]
  },
  {
    title: {
      pt: 'Linguagens de Programação',
      en: 'Programming Languages'
    },
    skills: [
      {
        name: 'JavaScript',
        icon: FileCode,
        description: {
          pt: 'Linguagem de programação dinâmica e versátil para desenvolvimento web e aplicações.',
          en: 'Dynamic and versatile programming language for web development and applications.'
        }
      },
      {
        name: 'TypeScript',
        icon: FileCode,
        description: {
          pt: 'Superset do JavaScript que adiciona tipagem estática e recursos avançados.',
          en: 'JavaScript superset that adds static typing and advanced features.'
        }
      },
      {
        name: 'React',
        icon: Atom,
        description: {
          pt: 'Biblioteca JavaScript para construção de interfaces de usuário interativas e reativas.',
          en: 'JavaScript library for building interactive and reactive user interfaces.'
        }
      },
      {
        name: 'Node.js',
        icon: Server,
        description: {
          pt: 'Runtime JavaScript para desenvolvimento de aplicações server-side escaláveis.',
          en: 'JavaScript runtime for building scalable server-side applications.'
        }
      },
      {
        name: 'Java',
        icon: Code,
        description: {
          pt: 'Linguagem de programação orientada a objetos amplamente utilizada em aplicações empresariais.',
          en: 'Object-oriented programming language widely used in enterprise applications.'
        }
      },
      {
        name: 'HTML',
        icon: FileCode,
        description: {
          pt: 'Linguagem de marcação para criar a estrutura de páginas web.',
          en: 'Markup language for creating the structure of web pages.'
        }
      },
      {
        name: 'CSS',
        icon: Palette,
        description: {
          pt: 'Linguagem de estilo para projetar páginas web.',
          en: 'Styling language for designing web pages.'
        }
      },
      {
        name: 'Go',
        icon: Braces,
        description: {
          pt: 'Linguagem com concorrência nativa; usei goroutines, channels, semáforos e monitores.',
          en: 'Language with native concurrency; I have used goroutines, channels, semaphores and monitors.'
        }
      },
      {
        name: 'R',
        icon: LineChart,
        description: {
          pt: 'Linguagem voltada a estatística e análise de dados.',
          en: 'Language focused on statistics and data analysis.'
        }
      },
      {
        name: 'Next.js',
        icon: Layout,
        description: {
          pt: 'Framework React para sites e aplicações web, usado neste portfólio e no Elyra.',
          en: 'React framework for websites and web apps, used in this portfolio and in Elyra.'
        }
      },
      {
        name: 'Tailwind CSS',
        icon: Wind,
        description: {
          pt: 'Framework de CSS utilitário para construir interfaces rapidamente.',
          en: 'Utility-first CSS framework for building interfaces quickly.'
        }
      },
      {
        name: 'Flask & REST APIs',
        icon: Server,
        description: {
          pt: 'Criação de APIs REST em Python com Flask, testadas com requests e Postman.',
          en: 'Building REST APIs in Python with Flask, tested with requests and Postman.'
        }
      },
      {
        name: 'C',
        icon: Terminal,
        description: {
          pt: 'Linguagem de programação de baixo nível usada para sistemas e desenvolvimento embarcado.',
          en: 'Low-level programming language used for systems and embedded development.'
        }
      },
      {
        name: 'Python',
        icon: Code,
        description: {
          pt: 'Linguagem de programação de propósito geral amplamente utilizada em ciência de dados.',
          en: 'A general-purpose programming language widely used in data science.'
        }
      }
    ]
  },
  {
    title: {
      pt: 'Matemática',
      en: 'Mathematics'
    },
    skills: [
      {
        name: 'Calculus I',
        icon: Calculator,
        description: {
          pt: 'Introdução a limites, derivadas e integrais.',
          en: 'Introduction to limits, derivatives, and integrals.'
        }
      },
      {
        name: 'Calculus II',
        icon: Calculator,
        description: {
          pt: 'Técnicas avançadas de integração e séries.',
          en: 'Advanced integration techniques and series.'
        }
      },
      {
        name: 'Calculus III',
        icon: Calculator,
        description: {
          pt: 'Cálculo diferencial e integral para funções de múltiplas variáveis e análise vetorial.',
          en: 'Differential and integral calculus for multivariable functions and vector analysis.'
        }
      },
      {
        name: 'Probability & Statistics',
        icon: BarChart,
        description: {
          pt: 'Estudo de chance e interpretação de dados.',
          en: 'Study of chance and data interpretation.'
        }
      },
      {
        name: 'Discrete Math',
        icon: Network,
        description: {
          pt: 'Estudo de estruturas matemáticas que são contáveis ou discretas.',
          en: 'Study of mathematical structures that are countable or discrete.'
        }
      },
      {
        name: 'Mathematical Analysis',
        icon: LineChart,
        description: {
          pt: 'Estuda rigorosamente funções, limites, continuidade, etc.',
          en: 'Rigorously studies functions, limits, continuity, etc.'
        }
      },
      {
        name: 'Linear and Matrix Algebra',
        icon: ScatterChart,
        description: {
          pt: 'Estudo de vetores, matrizes e transformações lineares.',
          en: 'Study of vectors, matrices, and linear transformations.'
        }
      },
      {
        name: 'Comparative Inference',
        icon: BarChart,
        description: {
          pt: 'Análise estatística comparada e métodos de inferência estatística.',
          en: 'Comparative statistical analysis and statistical inference methods.'
        }
      }
    ]
  },
  {
    title: {
      pt: 'Outros',
      en: 'Others'
    },
    skills: [
      {
        name: 'English B2',
        icon: Languages,
        description: {
          pt: 'Nível intermediário avançado em inglês, capaz de comunicação fluente e compreensão de textos complexos.',
          en: 'Upper-intermediate level in English, capable of fluent communication and understanding complex texts.'
        }
      },
      {
        name: 'French A2',
        icon: Languages,
        description: {
          pt: 'Nível básico em francês, com conhecimentos fundamentais para comunicação simples.',
          en: 'Basic level in French, with fundamental knowledge for simple communication.'
        }
      },
      {
        name: 'Photoshop',
        icon: Image,
        description: {
          pt: 'Software de edição de imagens profissional para design gráfico e manipulação de fotos.',
          en: 'Professional image editing software for graphic design and photo manipulation.'
        }
      },
      {
        name: 'Design',
        icon: PaletteIcon,
        description: {
          pt: 'Conhecimentos em design gráfico, interface de usuário e experiência do usuário.',
          en: 'Knowledge in graphic design, user interface and user experience.'
        }
      },
      {
        name: 'Gestão de Projetos',
        icon: Briefcase,
        description: {
          pt: 'Metodologias e ferramentas para planejamento, execução e controle de projetos.',
          en: 'Methodologies and tools for project planning, execution and control.'
        }
      },
      {
        name: 'Oracle',
        icon: Database,
        description: {
          pt: 'Sistema de gerenciamento de banco de dados relacional.',
          en: 'Relational database management system.'
        }
      },
      {
        name: 'MySQL',
        icon: DatabaseIcon,
        description: {
          pt: 'Banco de dados relacional de código aberto.',
          en: 'Open-source relational database.'
        }
      },
      {
        name: 'Scrum',
        icon: ListChecks,
        description: {
          pt: 'Framework ágil para organizar o trabalho em sprints, com papéis e cerimônias.',
          en: 'Agile framework for organizing work in sprints, with roles and ceremonies.'
        }
      },
      {
        name: 'Canva',
        icon: Palette,
        description: {
          pt: 'Criação rápida de materiais visuais e peças para redes e apresentações.',
          en: 'Quick creation of visual materials for social media and presentations.'
        }
      },
      {
        name: 'Obsidian',
        icon: BookOpen,
        description: {
          pt: 'App de notas em Markdown onde organizo faculdade, trabalho, treino e finanças, conectado ao Nube.',
          en: 'Markdown notes app where I organize college, work, training and finances, connected to Nube.'
        }
      },
      {
        name: 'Postman',
        icon: Send,
        description: {
          pt: 'Ferramenta para testar e documentar APIs.',
          en: 'Tool for testing and documenting APIs.'
        }
      },
      {
        name: 'Google Colab',
        icon: Workflow,
        description: {
          pt: 'Notebooks Python na nuvem, com GPU, para experimentos de dados e IA.',
          en: 'Cloud Python notebooks, with GPUs, for data and AI experiments.'
        }
      },
      {
        name: 'Git',
        icon: GitBranch,
        description: {
          pt: 'Sistema de controle de versão para rastrear mudanças no código.',
          en: 'Version control system for tracking code changes.'
        }
      }
    ]
  }
] 