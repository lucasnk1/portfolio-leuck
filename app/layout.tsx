import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

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
      <body className={`${inter.variable} ${outfit.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}