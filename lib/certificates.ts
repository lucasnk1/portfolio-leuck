export type CertificateCategory = 'ia' | 'data-science' | 'machine-learning' | 'database' | 'development' | 'cloud' | 'other'
export type CertificateFilter = 'all' | 'ia' | 'other'

export interface CertificateRecord {
  fileName: string
  fileBaseName: string
  slug: string
  prefix: string
  title: string
  institution: string
  category: CertificateCategory
  categoryLabel: string
  pdfUrl: string
  logoUrl: string
}

const LOGOS = {
  microsoft: '/certificados/logosEmpresas/Microsoft_logo.png',
  ibm: '/certificados/logosEmpresas/ibm.png',
  ieUniversity: '/certificados/logosEmpresas/IE_University_logo.png',
  universityOfChicago: '/certificados/logosEmpresas/University_of_Chicago.png',
} as const

const PREFIX_METADATA: Record<string, { institution: string; defaultLogo: string }> = {
  SOA: {
    institution: 'Santander Open Academy',
    defaultLogo: LOGOS.ieUniversity,
  },
  FB: {
    institution: 'Fundação Bradesco',
    defaultLogo: LOGOS.microsoft,
  },
}

const FILE_METADATA_OVERRIDES: Record<string, { title: string; institution: string; logo: string; category?: CertificateCategory }> = {
  'FB AI-900 Fund. IA Azure': {
    title: 'AI-900 AI Azure',
    institution: 'Microsoft',
    logo: LOGOS.microsoft,
  },
  'FB FluencIA': {
    title: 'Fluency in artificial intelligence',
    institution: 'Microsoft',
    logo: LOGOS.microsoft,
    category: 'machine-learning',
  },
  'SOA IA e Resp': {
    title: 'IA and Responsibility: Creating a Positive AI',
    institution: 'IBM',
    logo: LOGOS.ibm,
    category: 'ia',
  },
  'SOA Prompt Resp': {
    title: 'Responsible Prompting: Maximizing AI in your business',
    institution: 'Microsoft',
    logo: LOGOS.microsoft,
    category: 'ia',
  },
  'SOA Publicidade digital': {
    title: 'Leadership for Digital World',
    institution: 'IE University',
    logo: LOGOS.ieUniversity,
    category: 'other',
  },
  'SOA Storytelling': {
    title: 'Storytelling',
    institution: 'University of Chicago',
    logo: LOGOS.universityOfChicago,
    category: 'other',
  },
}

const CATEGORY_LABELS: Record<CertificateCategory, string> = {
  ia: 'Inteligência Artificial',
  'data-science': 'Data Science',
  'machine-learning': 'Machine Learning',
  database: 'Banco de Dados',
  development: 'Desenvolvimento',
  cloud: 'Cloud',
  other: 'Outros',
}

const FILTER_CATEGORY_MATCHES: Record<CertificateFilter, CertificateCategory[]> = {
  all: ['ia', 'data-science', 'machine-learning', 'database', 'development', 'cloud', 'other'],
  ia: ['ia', 'machine-learning'],
  other: ['data-science', 'database', 'development', 'cloud', 'other'],
}

const normalizeBaseName = (fileName: string) => fileName.replace(/\.[^/.]+$/, '')

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getPrefix = (fileBaseName: string) => {
  const [prefix = ''] = fileBaseName.trim().split(/[\s_-]+/)
  return prefix.toUpperCase()
}

const getTitle = (fileBaseName: string) => {
  const prefix = getPrefix(fileBaseName)
  const titlePart = fileBaseName.replace(new RegExp(`^${prefix}[\s_-]*`, 'i'), '')
  const normalized = titlePart
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return normalized || fileBaseName
}

const getCategory = (fileBaseName: string): CertificateCategory => {
  const normalized = fileBaseName.toLowerCase()

  if (/sql|database|banco de dados|banco/i.test(normalized)) return 'database'
  if (/python|pandas|power bi|data|dados|analytics|bi/i.test(normalized)) return 'data-science'
  if (/cloud|aws|gcp|kubernetes|docker|azure/i.test(normalized)) return 'cloud'
  if (/machine learning|ml|learning/i.test(normalized)) return 'machine-learning'
  if (/ia|intelig|prompt|ai/i.test(normalized)) return 'ia'
  if (/dev|desenvolv|web|app|program|api|flask|react|next/i.test(normalized)) return 'development'

  return 'other'
}

const getLogo = (fileBaseName: string, prefix: string) =>
  FILE_METADATA_OVERRIDES[fileBaseName]?.logo ?? PREFIX_METADATA[prefix]?.defaultLogo ?? LOGOS.ieUniversity

export const getCertificateCategoryLabel = (category: CertificateCategory) => CATEGORY_LABELS[category]

export const getCertificateFilterLabel = (filter: CertificateFilter) => {
  const labels: Record<CertificateFilter, string> = {
    all: 'Todos',
    ia: 'IA',
    other: 'Outros',
  }

  return labels[filter]
}

export const getCertificateFilters = (): Array<{ id: CertificateFilter; label: string }> => [
  { id: 'all', label: getCertificateFilterLabel('all') },
  { id: 'ia', label: getCertificateFilterLabel('ia') },
  { id: 'other', label: getCertificateFilterLabel('other') },
]

export const doesCertificateMatchFilter = (category: CertificateCategory, filter: CertificateFilter) => {
  return FILTER_CATEGORY_MATCHES[filter].includes(category)
}

export const buildCertificateRecord = (fileName: string): CertificateRecord => {
  const fileBaseName = normalizeBaseName(fileName)
  const prefix = getPrefix(fileBaseName)
  const metadataOverride = FILE_METADATA_OVERRIDES[fileBaseName]
  const institution = metadataOverride?.institution ?? PREFIX_METADATA[prefix]?.institution ?? prefix
  const title = metadataOverride?.title ?? getTitle(fileBaseName)
  const category = metadataOverride?.category ?? getCategory(fileBaseName)
  const pdfUrl = `/certificados/pdfs/${encodeURIComponent(fileName)}`
  const logoUrl = getLogo(fileBaseName, prefix)

  return {
    fileName,
    fileBaseName,
    slug: toSlug(fileBaseName),
    prefix,
    title,
    institution,
    category,
    categoryLabel: getCertificateCategoryLabel(category),
    pdfUrl,
    logoUrl,
  }
}

export const getCertificateStats = (certificates: CertificateRecord[]) => {
  const institutionCount = new Set(certificates.map((certificate) => certificate.institution)).size
  const categoryCount = new Set(certificates.map((certificate) => certificate.category)).size

  return {
    totalCertificates: certificates.length,
    totalInstitutions: institutionCount,
    totalCategories: categoryCount,
  }
}
