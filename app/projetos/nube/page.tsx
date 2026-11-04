import type { Metadata } from 'next'
import NubeProject from '@/components/projects/NubeProject'

export const metadata: Metadata = {
  title: 'Nube · Assistente pessoal · Lucas Leuck',
  description:
    'Nube, meu assistente pessoal com IA: conectado ao Obsidian, com modelo local pelo Ollama e dashboard para faculdade, trabalho, academia e financeiro. Em desenvolvimento, open source no futuro.',
  openGraph: {
    title: 'Nube · Assistente pessoal · Lucas Leuck',
    description: 'Assistente pessoal com IA conectado ao Obsidian e rodando localmente com Ollama. Em desenvolvimento.',
    type: 'article',
    images: ['/projetos/nube/nube.webp'],
  },
}

export default function Page() {
  return <NubeProject />
}
