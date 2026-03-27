import type { ComponentChildren } from 'preact'

export function ForkGrid({ children }: { children: ComponentChildren }) {
  return <div class="fork-grid">{children}</div>
}

export function ForkCard({
  title,
  highlighted,
  dimmed,
  children,
}: {
  title: string
  highlighted?: boolean
  dimmed?: boolean
  children: ComponentChildren
}) {
  const cls = [
    'fork-card',
    highlighted && 'highlighted',
    dimmed && 'dimmed',
  ].filter(Boolean).join(' ')

  return (
    <div class={cls}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
