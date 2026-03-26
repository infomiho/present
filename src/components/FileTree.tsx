import type { ComponentChildren } from 'preact'

export type Badge = {
  label: string
  color?: string
}

export function FileTree({ children }: { children: ComponentChildren }) {
  return <div class="ft">{children}</div>
}

export function Folder({
  name,
  children,
}: {
  name: string
  children: ComponentChildren
}) {
  return (
    <div>
      <div class="ft-folder-name">{name}/</div>
      <div class="ft-children">{children}</div>
    </div>
  )
}

export function File({
  name,
  active,
  dimmed,
  badges,
}: {
  name: string
  active?: boolean
  dimmed?: boolean
  badges?: Badge[]
}) {
  const cls = [
    'ft-file',
    active && 'ft-active',
    dimmed && 'ft-dimmed',
  ].filter(Boolean).join(' ')

  return (
    <div class={cls}>
      <span class="ft-file-name">{name}</span>
      {badges && badges.length > 0 && (
        <span class="ft-badges">
          {badges.map((b, i) => (
            <span
              key={i}
              class="ft-badge"
              style={{
                background: `color-mix(in srgb, ${b.color ?? 'var(--accent)'} 15%, transparent)`,
                color: b.color ?? 'var(--accent)',
              }}
            >
              {b.label}
            </span>
          ))}
        </span>
      )}
    </div>
  )
}
