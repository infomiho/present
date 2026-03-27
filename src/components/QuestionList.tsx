import type { ComponentChildren } from 'preact'

export function QuestionList({
  items,
  step,
}: {
  items: ComponentChildren[]
  step?: number
}) {
  const visibleItems = step !== undefined ? items.slice(0, step + 1) : items

  return (
    <ul class="question-list">
      {visibleItems.map((item, i) => (
        <li key={i}>
          <span class="q-mark">?</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
