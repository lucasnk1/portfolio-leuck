import { NextResponse } from 'next/server'
import { getGithubProjects } from '@/lib/github-projects'

export const revalidate = 3600

export async function GET() {
  try {
    const [academic, personal] = await Promise.all([
      getGithubProjects('academic'),
      getGithubProjects('personal'),
    ])

    return NextResponse.json({ academic, personal })
  } catch {
    return NextResponse.json({ error: 'Não foi possível carregar os projetos.' }, { status: 500 })
  }
}
