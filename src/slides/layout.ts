export const twoCol = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  alignItems: 'start',
} as const

export const colLabel = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '.68rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  color: 'var(--text-dim)',
  marginBottom: '10px',
} as const

export const fadeIn = (visible: boolean) => ({
  opacity: visible ? 1 : 0,
  transition: 'opacity 0.3s ease',
})

export const stack = {
  display: 'grid',
} as const

export const snapIn = (visible: boolean) => ({
  gridArea: '1/1',
  opacity: visible ? 1 : 0,
})
