import type { ComponentChildren } from 'preact'

export function Compare({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  before: ComponentChildren
  after: ComponentChildren
  beforeLabel?: string
  afterLabel?: string
}) {
  return (
    <div class="compare">
      <div class="compare-before">
        <div class="compare-label">{beforeLabel}</div>
        {before}
      </div>
      <div class="compare-after">
        <div class="compare-label">{afterLabel}</div>
        {after}
      </div>
    </div>
  )
}
