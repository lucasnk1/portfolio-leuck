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

/**
 * Endereço público do site, usado para montar a URL absoluta da imagem de prévia
 * (LinkedIn, WhatsApp, X...). Defina NEXT_PUBLIC_SITE_URL com o seu domínio;
 * sem ela, usa o endereço que a Vercel fornece.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'http://localhost:3000'

const description =
  'Portfólio de Lucas Leuck, estudante de Ciência de Dados e IA na PUCRS: projetos, habilidades, trajetória e o Nube, meu assistente.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Lucas Leuck · Portfólio',
  description,
  keywords: ['Data Science', 'AI', 'Python', 'Power BI', 'Automation'],
  authors: [{ name: 'Lucas Leuck de Oliveira' }],
  openGraph: {
    title: 'Lucas Leuck · Portfólio',
    description,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Lucas Leuck',
    // prévia do link com o Nube (antes o LinkedIn pegava a primeira imagem da página)
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Lucas Leuck de Oliveira e o Nube' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Leuck · Portfólio',
    description,
    images: ['/og-image.jpg'],
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