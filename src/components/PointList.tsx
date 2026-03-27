import type { ComponentChildren } from 'preact'

export function PointList({
  items,
  step,
  numbered = true,
}: {
  items: ComponentChildren[]
  step?: number
  numbered?: boolean
}) {
  const visibleItems = step !== undefined ? items.slice(0, step + 1) : items

  return (
    <ul class="point-list">
      {visibleItems.map((item, i) => (
        <li key={i}>
          {numbered
            ? <span class="point-bullet">{i + 1}</span>
            : <span class="point-dot" />
          }
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
