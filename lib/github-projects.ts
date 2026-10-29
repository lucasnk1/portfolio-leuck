export interface GithubProject {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  learnMoreUrl?: string
  imageUrl?: string
  imageAlt?: string
}

const IMAGE_OVERRIDES: Record<string, { imageUrl: string; imageAlt: string }> = {
  'lucasnk1/elyra': {
    imageUrl: '/printhome.png',
    imageAlt: 'Página inicial da plataforma Elyra',
  },
  'cafezinho-labs/data-detective': {
    imageUrl: '/print-datadetective.jpeg',
    imageAlt: 'Interface do Data Detective mostrando um caso de investigação de dados',
  },
}

const MANUAL_PERSONAL_PROJECTS: GithubProject[] = [
  {
    title: 'eBook: JOVENS E A CORRIDA PELO DINHEIRO',
    description: 'Um olhar honesto sobre a geração que corre sem saber onde quer chegar — e o preço que paga por isso.',
    technologies: [],
    learnMoreUrl: 'https://docs.google.com/document/d/1ZX7XrDxalbt19qlP34cvyzclXYiEiXaSa-QbcPVMP-o/edit?usp=sharing',
    imageUrl: '/ebook-capa.jpg',
    imageAlt: 'Capa do eBook Jovens e a Corrida pelo Dinheiro',
  },
]

export type ProjectCategory = 'academic' | 'personal'

const GITHUB_USER = 'lucasnk1'

const LIST_SLUGS: Record<ProjectCategory, string> = {
  academic: 'cdia-pucrs',
  personal: 'projetos-pessoais',
}

const REVALIDATE_SECONDS = 3600

const apiHeaders = (): HeadersInit => ({
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
})

const prettifyName = (name: string) => name.replace(/[-_]+/g, ' ').trim()

const getRepoSlugsFromList = async (listSlug: string): Promise<string[]> => {
  const response = await fetch(`https://github.com/stars/${GITHUB_USER}/lists/${listSlug}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-leuck)' },
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (!response.ok) throw new Error(`List ${listSlug} returned ${response.status}`)

  const html = await response.text()
  const matches = Array.from(html.matchAll(/href="\/([\w.-]+\/[\w.-]+)"/g), (match) => match[1])

  return Array.from(new Set(matches))
}

const getRepoProject = async (fullName: string): Promise<GithubProject | null> => {
  const response = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers: apiHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (!response.ok) return null

  const repo = await response.json()
  const technologies = [repo.language, ...(repo.topics ?? [])].filter(Boolean) as string[]

  return {
    title: prettifyName(repo.name),
    description: repo.description ?? '',
    technologies,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    ...IMAGE_OVERRIDES[String(repo.full_name).toLowerCase()],
  }
}

export const getGithubProjects = async (category: ProjectCategory): Promise<GithubProject[]> => {
  const slugs = await getRepoSlugsFromList(LIST_SLUGS[category])
  const projects = await Promise.all(slugs.map(getRepoProject))

  const githubProjects = projects.filter((project): project is GithubProject => project !== null)

  return category === 'personal' ? [...githubProjects, ...MANUAL_PERSONAL_PROJECTS] : githubProjects
}
