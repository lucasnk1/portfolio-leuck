/**
 * Nube simplificado (ícone): usado no favicon e na marca da navbar.
 * Formas grossas para continuar legível em 16px.
 */
export const NUBE_MARK_PATHS = {
  body: 'M10 55 C3 55 3 43 9.5 39 C9.5 25 19.5 17 32 17 C44.5 17 54.5 25 54.5 39 C61 43 61 55 54 55 Q43 58.5 32 55.5 Q21 58.5 10 55 Z',
  crown: 'M12 35 C10.5 19 20.5 9 32 9 C43.5 9 53.5 19 52 35 Q32 31 12 35 Z',
  brim: 'M8.5 34 Q32 28 55.5 34 Q58 39.5 51.5 40.5 Q32 36.5 12.5 40.5 Q6 39.5 8.5 34 Z',
  cloud: 'M26.5 25.5 a3.2 3.2 0 0 1 2.4-4.6 a4.6 4.6 0 0 1 8.6-0.6 a3.2 3.2 0 0 1 3.4 4.4 a2.4 2.4 0 0 1-1.4 3.6 h-11.6 a2.4 2.4 0 0 1-1.4-2.8 Z',
}

export default function NubeMark({ size = 28, className }: { size?: number; className?: string }) {
  const p = NUBE_MARK_PATHS
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <path d={p.body} fill="#f4f4f6" stroke="#c9cbd1" strokeWidth="1.5" />
      <ellipse cx="25" cy="46" rx="3.4" ry="4.4" fill="#2b0e08" />
      <ellipse cx="39" cy="46" rx="3.4" ry="4.4" fill="#2b0e08" />
      <circle cx="23.9" cy="44.4" r="1.1" fill="#fff" />
      <circle cx="37.9" cy="44.4" r="1.1" fill="#fff" />
      <path d="M14 47 Q32 60 50 47" fill="none" stroke="#b9bbc4" strokeWidth="1.6" strokeDasharray="1.6 1.2" strokeLinecap="round" />
      <path d={p.crown} fill="#151517" />
      <path d={p.brim} fill="#050506" />
      <path d={p.cloud} fill="#f4f4f6" />
    </svg>
  )
}
