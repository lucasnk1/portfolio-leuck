import type { Language } from './i18n'

/**
 * Projetos do portfólio, cadastrados manualmente.
 * Para adicionar um projeto, copie um dos objetos abaixo e preencha os campos.
 *
 *  - description: texto em PT e EN
 *  - githubUrl / liveUrl: links externos (opcionais)
 *  - detailsUrl: página interna de detalhes (ex.: '/projetos/tomate')
 *  - learnMoreUrl: link externo de "Saiba mais" (ex.: documento)
 *  - imageUrl: imagem em /public (opcional)
 */

export interface Project {
  title: string
  description: Record<Language, string>
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  detailsUrl?: string
  learnMoreUrl?: string
  imageUrl?: string
  imageAlt?: string
}

/* ------------------------------------------------------------------ */
/* Projeto em destaque                                                 */
/* ------------------------------------------------------------------ */

export const FEATURED_PROJECT = {
  slug: 'tomate',
  detailsUrl: '/projetos/tomate',
  githubUrl: 'https://github.com/lucasnk1/tomate-classificacao-visao-classica',
  imageUrl: '/projetos/tomate/folha-septoria.jpg',
  /** tira com as 4 etapas do pipeline, mostrada como capa 2x2 */
  coverStrip: '/projetos/tomate/pipeline-etapas.png',
  label: { pt: 'VISÃO COMPUTACIONAL', en: 'COMPUTER VISION' },
  title: { pt: 'Doenças em Folhas de Tomate', en: 'Tomato Leaf Diseases' },
  description: {
    pt: 'Classificação de doenças em folhas de tomate do PlantVillage só com visão computacional clássica, sem deep learning. Um pipeline em OpenCV segmenta a folha e as lesões, extrai 173 características de cor, textura e forma e compara SVM, Random Forest e MLP: 98,8% de acurácia em saudável vs. doente e 88,9% em 10 classes.',
    en: 'Tomato leaf disease classification on PlantVillage using only classical computer vision, no deep learning. An OpenCV pipeline segments the leaf and lesions, extracts 173 color, texture and shape features and compares SVM, Random Forest and MLP: 98.8% accuracy for healthy vs. diseased and 88.9% across 10 classes.',
  },
  technologies: ['PYTHON', 'OPENCV', 'SCIKIT-LEARN', 'SCIKIT-IMAGE', 'SVM'],
}

/* ------------------------------------------------------------------ */
/* Acadêmicos                                                          */
/* ------------------------------------------------------------------ */

export const ACADEMIC_PROJECTS: Project[] = [
  {
    title: 'Doenças em Folhas de Tomate',
    description: {
      pt: 'Visão computacional clássica no PlantVillage: segmentação em OpenCV, 173 características de cor, textura e forma e comparação de SVM, Random Forest e MLP.',
      en: 'Classical computer vision on PlantVillage: OpenCV segmentation, 173 color, texture and shape features and a comparison of SVM, Random Forest and MLP.',
    },
    technologies: ['Python', 'OpenCV', 'scikit-learn', 'scikit-image', 'Jupyter'],
    githubUrl: 'https://github.com/lucasnk1/tomate-classificacao-visao-classica',
    detailsUrl: '/projetos/tomate',
    imageUrl: '/projetos/tomate/folha-septoria.jpg',
    imageAlt: 'Folha de tomate com manchas de Septoria',
  },
  {
    title: 'Masked Face Recognition Pipeline',
    description: {
      pt: 'Estudo e implementação de um pipeline de reconhecimento facial com rostos mascarados, usando embeddings de CNN e bancos de dados vetoriais (ChromaDB/FaceDB) para busca por similaridade.',
      en: 'Study and implementation of a masked face recognition pipeline using CNN embeddings and vector databases (ChromaDB/FaceDB) for similarity search.',
    },
    technologies: ['Python', 'CNN', 'Embeddings', 'ChromaDB', 'FaceDB', 'Jupyter'],
    githubUrl: 'https://github.com/lucasnk1/masked-face-recognition-pipeline',
  },
  {
    title: 'Processamento e Transformação de Imagens com OpenCV',
    description: {
      pt: 'Notebook de visão computacional: histogramas, ruído, binarização, transformações lineares e não lineares, equalização (global, YCrCb e CLAHE) e compressão JPEG.',
      en: 'Computer vision notebook: histograms, noise, binarization, linear and non-linear transforms, equalization (global, YCrCb and CLAHE) and JPEG compression.',
    },
    technologies: ['Python', 'OpenCV', 'NumPy', 'Jupyter'],
    githubUrl: 'https://github.com/lucasnk1/Processamento-Transformacao-Imagens-OpenCV',
  },
  {
    title: 'Tower Defense Concorrente em Go',
    description: {
      pt: 'Jogo Tower Defense de terminal em Go em que a concorrência é parte central da arquitetura: entidades autônomas com goroutines que se comunicam por channels.',
      en: 'Terminal Tower Defense game in Go where concurrency is central to the architecture: autonomous entities built with goroutines that talk through channels.',
    },
    technologies: ['Go', 'Goroutines', 'Channels', 'Concorrência'],
    githubUrl: 'https://github.com/jpfossa/Jogo_Concorrente_Terminal_FPPD',
  },
  {
    title: 'Semáforos e Monitores em Go',
    description: {
      pt: 'Sincronização concorrente em Go: controle de acesso com semáforo contador e largada sincronizada com sync.Cond e Broadcast, com explicação e validação dos resultados.',
      en: 'Concurrent synchronization in Go: access control with a counting semaphore and a synchronized start with sync.Cond and Broadcast, with explanation and validation.',
    },
    technologies: ['Go', 'Semáforos', 'sync.Cond', 'Concorrência'],
    githubUrl: 'https://github.com/lucasnk1/Semaforos-e-Monitores-Go',
  },
  {
    title: 'Channels em Go',
    description: {
      pt: 'Códigos de referência e pontos de partida do roteiro prático sobre canais em Go: comunicação entre goroutines e sincronização por mensagens.',
      en: 'Reference code and starting points for a hands-on guide to channels in Go: communication between goroutines and message-based synchronization.',
    },
    technologies: ['Go', 'Channels', 'Goroutines'],
    githubUrl: 'https://github.com/lucasnk1/Channels-em-GO',
  },
  {
    title: 'Crawler Wikipedia e Grau de Separação',
    description: {
      pt: 'Crawler que navega pela Wikipédia, identifica páginas de pessoas e monta um grafo de conexões entre elas, usando BFS para mostrar o grau de separação e o caminho entre duas pessoas.',
      en: 'A crawler that walks Wikipedia, finds pages about people and builds a graph of their connections, using BFS to show the degree of separation and the path between two people.',
    },
    technologies: ['Python', 'Grafos', 'BFS', 'HTML'],
    githubUrl: 'https://github.com/lucasnk1/crawler-wikipedia',
  },
  {
    title: 'Coleta de Dados do IMDB',
    description: {
      pt: 'Web scraping do IMDB (Internet Movie Database) com Selenium, simulando a navegação de um usuário real para contornar proteções básicas do site.',
      en: 'IMDB (Internet Movie Database) web scraping with Selenium, simulating a real user to get past the site’s basic protections.',
    },
    technologies: ['Python', 'Selenium', 'Web Scraping', 'JSON'],
    githubUrl: 'https://github.com/lucasnk1/Coleta-de-Dados-do-IMDB',
  },
  {
    title: 'EDA do Dataset Palmer Penguins',
    description: {
      pt: 'Análise exploratória e pré-processamento do Palmer Penguins: identificação de features, tratamento de valores faltantes e análise de balanceamento de classes.',
      en: 'Exploratory analysis and preprocessing of Palmer Penguins: feature identification, missing value handling and class balance analysis.',
    },
    technologies: ['Python', 'Pandas', 'EDA', 'Jupyter'],
    githubUrl: 'https://github.com/lucasnk1/analise-dados-penguins',
  },
  {
    title: 'API REST Pandas ClashDataset',
    description: {
      pt: 'API REST em Flask para consulta e CRUD do dataset clash_wiki_dataset.csv com Pandas, com script de consumo (requests) e coleção Postman para validação.',
      en: 'Flask REST API for querying and CRUD on the clash_wiki_dataset.csv dataset with Pandas, plus a client script (requests) and a Postman collection for validation.',
    },
    technologies: ['Python', 'Flask', 'Pandas', 'API REST', 'Postman'],
    githubUrl: 'https://github.com/lucasnk1/API-REST-Pandas-ClashDataset',
  },
]

/* ------------------------------------------------------------------ */
/* Pessoais                                                            */
/* ------------------------------------------------------------------ */

export const PERSONAL_PROJECTS: Project[] = [
  {
    title: 'Data Detective',
    description: {
      pt: 'Aprenda SQL resolvendo mistérios: investigue casos analisando dados e descubra o culpado.',
      en: 'Learn SQL by solving mysteries: investigate cases by analyzing data and find the culprit.',
    },
    technologies: ['TypeScript', 'SQL', 'CSS'],
    githubUrl: 'https://github.com/Cafezinho-Labs/Data-Detective',
    liveUrl: 'https://data-detective-seven.vercel.app/',
    imageUrl: '/print-datadetective.jpeg',
    imageAlt: 'Interface do Data Detective mostrando um caso de investigação de dados',
  },
  {
    title: 'DataMind',
    description: {
      pt: 'Assistente de análise de dados com IA: importa até 5 bases, faz limpeza, integração e análise automática, gera dashboards interativos estilo Power BI e responde perguntas em tempo real com chat e voz.',
      en: 'AI data analysis assistant: imports up to 5 datasets, cleans, joins and analyzes them automatically, builds Power BI–style interactive dashboards and answers questions in real time by chat and voice.',
    },
    technologies: ['Python', 'IA', 'Dashboards'],
    githubUrl: 'https://github.com/lucasnk1/DataMind',
  },
  {
    title: 'Elyra',
    description: {
      pt: 'Plataforma de inteligência tecnológica movida por IA que reúne e organiza as notícias mais relevantes do ecossistema tech em tempo real.',
      en: 'AI-powered technology intelligence platform that gathers and organizes the most relevant tech news in real time.',
    },
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL'],
    githubUrl: 'https://github.com/lucasnk1/elyra',
    liveUrl: 'https://elyra-red.vercel.app',
    imageUrl: '/printhome.png',
    imageAlt: 'Página inicial da plataforma Elyra',
  },
  {
    title: 'Assistente RAG sobre a LGPD',
    description: {
      pt: 'Perguntas e respostas sobre a LGPD com Retrieval-Augmented Generation: busca vetorial no ChromaDB e geração com Gemini restrita aos trechos recuperados, com citação do artigo e avaliação da recuperação e da fidelidade.',
      en: 'Q&A about Brazil’s LGPD data protection law with Retrieval-Augmented Generation: vector search in ChromaDB and Gemini answers grounded in the retrieved passages, citing the article, with retrieval and faithfulness evaluation.',
    },
    technologies: ['Python', 'RAG', 'ChromaDB', 'Gemini', 'Gradio'],
    githubUrl: 'https://github.com/lucasnk1/RAG-LGPD',
  },
  {
    title: 'eBook: Jovens e a Corrida pelo Dinheiro',
    description: {
      pt: 'Um olhar honesto sobre a geração que corre sem saber onde quer chegar, e o preço que paga por isso.',
      en: 'An honest look at a generation running without knowing where it wants to go, and the price it pays for it.',
    },
    technologies: [],
    detailsUrl: '/projetos/livro',
    learnMoreUrl: 'https://docs.google.com/document/d/1ZX7XrDxalbt19qlP34cvyzclXYiEiXaSa-QbcPVMP-o/edit?tab=t.0',
    imageUrl: '/projetos/ebook/capa.webp',
    imageAlt: 'Capa do eBook Jovens e a Corrida pelo Dinheiro',
  },
]
