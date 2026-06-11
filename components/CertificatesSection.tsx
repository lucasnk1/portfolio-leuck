'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Search } from 'lucide-react'
import { Language, translations } from '@/lib/i18n'
import {
  CertificateFilter,
  CertificateRecord,
  doesCertificateMatchFilter,
  getCertificateStats,
} from '@/lib/certificates'

interface CertificatesSectionProps {
  currentLanguage: Language
}

const filterLabels = {
  pt: {
    all: 'Todos',
    ia: 'IA',
    other: 'Outros',
  },
  en: {
    all: 'All',
    ia: 'AI',
    other: 'Other',
  },
} as const

const categoryLabels = {
  pt: {
    ia: 'Inteligência Artificial',
    'data-science': 'Data Science',
    'machine-learning': 'Machine Learning',
    database: 'Banco de Dados',
    development: 'Desenvolvimento',
    cloud: 'Cloud',
    other: 'Outros',
  },
  en: {
    ia: 'Artificial Intelligence',
    'data-science': 'Data Science',
    'machine-learning': 'Machine Learning',
    database: 'Databases',
    development: 'Development',
    cloud: 'Cloud',
    other: 'Other',
  },
} as const

const CertificatesSection = ({ currentLanguage }: CertificatesSectionProps) => {
  const t = translations[currentLanguage]
  const [certificates, setCertificates] = useState<CertificateRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<CertificateFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadCertificates = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/certificados')

        if (!response.ok) {
          throw new Error('Falha ao carregar certificados.')
        }

        const data = (await response.json()) as CertificateRecord[]

        if (isMounted) {
          setCertificates(data)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError(t.certificates.loadError)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCertificates()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => getCertificateStats(certificates), [certificates])

  const localizedFilters = useMemo(
    () => [
      { id: 'all' as const, label: filterLabels[currentLanguage].all },
      { id: 'ia' as const, label: filterLabels[currentLanguage].ia },
      { id: 'other' as const, label: filterLabels[currentLanguage].other },
    ],
    [currentLanguage]
  )

  const filteredCertificates = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return certificates.filter((certificate) => {
      const matchesFilter = doesCertificateMatchFilter(certificate.category, activeFilter)
      const matchesSearch =
        normalizedSearch.length === 0 ||
        certificate.title.toLowerCase().includes(normalizedSearch) ||
        certificate.institution.toLowerCase().includes(normalizedSearch)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, certificates, searchTerm])

  return (
    <section id="certificados" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 tracking-tight">
            {t.certificates.title}
          </h2>
          <div className="divider-chrome w-24 mx-auto"></div>
          <p className="text-dim mt-6 max-w-3xl mx-auto leading-relaxed font-light">
            {t.certificates.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { value: stats.totalCertificates, label: t.certificates.stats.totalCertificates },
            { value: stats.totalInstitutions, label: t.certificates.stats.totalInstitutions },
            { value: stats.totalCategories, label: t.certificates.stats.totalCategories },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl font-heading font-bold chrome-text mb-2">{stat.value}</div>
              <p className="text-sm text-dim">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={t.certificates.searchPlaceholder}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-dim focus:outline-none focus:border-white/[0.2] transition-colors duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {localizedFilters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                        : 'bg-white/[0.03] text-dim border-white/[0.08] hover:text-foreground hover:border-white/[0.16]'
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="h-14 w-14 rounded-2xl bg-white/[0.06] mb-5" />
                <div className="h-4 w-1/2 bg-white/[0.06] rounded mb-3" />
                <div className="h-3 w-2/3 bg-white/[0.04] rounded mb-2" />
                <div className="h-3 w-1/3 bg-white/[0.04] rounded mb-6" />
                <div className="h-10 w-full bg-white/[0.06] rounded-xl" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center text-dim">
            <Search className="mx-auto mb-4" size={28} />
            <p>{error}</p>
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center text-dim">
            <Search className="mx-auto mb-4" size={28} />
            <p>{t.certificates.emptyState}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.slug}
                certificate={certificate}
                index={index}
                viewLabel={t.certificates.viewCertificate}
                categoryLabel={categoryLabels[currentLanguage][certificate.category]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

interface CertificateCardProps {
  certificate: CertificateRecord
  index: number
  viewLabel: string
  categoryLabel: string
}

const CertificateCard = ({ certificate, index, viewLabel, categoryLabel }: CertificateCardProps) => {
  const [logoError, setLogoError] = useState(false)

  const initials = certificate.institution
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      viewport={{ once: true, margin: '-40px' }}
      className="glass-card rounded-2xl p-6 card-hover group flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden flex items-center justify-center shrink-0">
          {!logoError ? (
            <img
              src={certificate.logoUrl}
              alt={certificate.institution}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              onError={() => setLogoError(true)}
              loading="lazy"
            />
          ) : (
            <span className="text-sm font-heading font-bold chrome-text">{initials}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex mb-3 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-dim border border-white/[0.08]">
            {categoryLabel}
          </span>
          <h3 className="text-xl font-heading font-semibold text-foreground tracking-tight leading-tight mb-2">
            {certificate.title}
          </h3>
          <p className="text-sm text-dim leading-relaxed">{certificate.institution}</p>
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-2">
        <a
          href={certificate.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
        >
          <ExternalLink size={14} />
          <span>{viewLabel}</span>
        </a>
      </div>
    </motion.article>
  )
}

export default CertificatesSection
