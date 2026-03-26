import type { ComponentChildren } from 'preact'

export function QuestionList({ items }: { items: ComponentChildren[] }) {
  return (
    <ul class="question-list">
      {items.map((item, i) => (
        <li key={i}>
          <span class="q-mark">?</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
