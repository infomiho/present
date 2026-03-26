import type { ComponentChildren } from 'preact'

export function PointList({ items }: { items: ComponentChildren[] }) {
  return (
    <ul class="point-list">
      {items.map((item, i) => (
        <li key={i}>
          <span class="point-bullet">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
