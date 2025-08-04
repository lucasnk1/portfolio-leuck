import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leuck Personal Website',
  description: 'Portfólio de Lucas Leuck, estudante de Ciência de Dados com interesse em Inteligência Artificial, Automação e Negócios.',
  keywords: ['Data Science', 'AI', 'Python', 'Power BI', 'Automation'],
  authors: [{ name: 'Lucas Leuck de Oliveira' }],
  openGraph: {
    title: 'Leuck Personal Website',
    description: 'Portfólio de Lucas Leuck, estudante de Ciência de Dados com interesse em Inteligência Artificial, Automação e Negócios.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 