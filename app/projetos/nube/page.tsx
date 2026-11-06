import type { Metadata } from 'next'
import NubeProject from '@/components/projects/NubeProject'

export const metadata: Metadata = {
  title: 'Nube · Assistente pessoal · Lucas Leuck',
  description:
    'Nube, meu assistente pessoal com IA: mora no meu cofre do Obsidian, conversa pelo Gemini, busca prazos no Moodle, instala no celular e deixa a família saber onde eu provavelmente estou. Em desenvolvimento e já em uso.',
  openGraph: {
    title: 'Nube · Assistente pessoal · Lucas Leuck',
    description: 'Assistente pessoal com IA conectado ao Obsidian, com Gemini, Moodle e acesso para a família. Em desenvolvimento.',
    type: 'article',
    images: [{ url: '/projetos/nube/og-nube.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <NubeProject />
}
