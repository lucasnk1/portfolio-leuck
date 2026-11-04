import type { Metadata } from 'next'
import BookProject from '@/components/projects/BookProject'

export const metadata: Metadata = {
  title: 'Jovens e a Corrida pelo Dinheiro · Lucas Leuck',
  description:
    'O desespero por sucesso na geração da pressa. Livro de Lucas Leuck sobre pressa, comparação, trabalho e dinheiro como identidade, em 3 partes e 13 capítulos. Leitura gratuita.',
  openGraph: {
    title: 'Jovens e a Corrida pelo Dinheiro · Lucas Leuck',
    description: 'O desespero por sucesso na geração da pressa. Leitura gratuita.',
    type: 'book',
    images: [{ url: '/projetos/ebook/og-livro.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <BookProject />
}
