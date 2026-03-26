import type { ComponentChildren } from 'preact'

export function ForkGrid({ children }: { children: ComponentChildren }) {
  return <div class="fork-grid">{children}</div>
}

export function ForkCard({
  title,
  highlighted,
  children,
}: {
  title: string
  highlighted?: boolean
  children: ComponentChildren
}) {
  return (
    <div class={`fork-card${highlighted ? ' highlighted' : ''}`}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
