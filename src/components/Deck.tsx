import { toChildArray, cloneElement, type VNode, type ComponentChildren } from 'preact'
import { useState, useEffect, useCallback, useRef } from 'preact/hooks'

export function Slide({
  children,
  subSteps,
  className,
  _active,
  _exit,
  _step,
}: {
  children: ComponentChildren | ((step: number) => ComponentChildren)
  subSteps?: number
  className?: string
  _active?: boolean
  _exit?: boolean
  _step?: number
}) {
  void subSteps
  const cls = [
    'slide',
    _active && 'active',
    _exit && 'exit',
    className,
  ].filter(Boolean).join(' ')

  const content = typeof children === 'function' ? children(_step ?? 0) : children

  return (
    <div class={cls}>
      <div class="slide-inner">{content}</div>
    </div>
  )
}

export function Deck({ children }: { children: ComponentChildren }) {
  const slides = toChildArray(children)
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const [subStep, setSubStep] = useState(0)

  const currentRef = useRef(current)
  const subStepRef = useRef(subStep)
  currentRef.current = current
  subStepRef.current = subStep

  const subStepsMap = useRef<number[]>([])
  subStepsMap.current = slides.map(s => (s as VNode)?.props?.subSteps ?? 0)

  const lastStepBySlide = useRef<Record<number, number>>({})

  const go = useCallback((dir: number) => {
    const cur = currentRef.current
    const sub = subStepRef.current
    const maxSub = subStepsMap.current[cur] ?? 0

    if (dir === 1 && sub < maxSub) {
      setSubStep(sub + 1)
      return
    }
    if (dir === -1 && sub > 0) {
      setSubStep(sub - 1)
      return
    }

    const next = Math.max(0, Math.min(total - 1, cur + dir))
    if (next !== cur) {
      lastStepBySlide.current[cur] = sub
      setCurrent(next)
      const nextMax = subStepsMap.current[next] ?? 0
      setSubStep(dir === -1 ? nextMax : 0)
    }
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        go(1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div class="deck">
      <div class="deck-grid" />
      {slides.map((slide, i) =>
        cloneElement(slide as VNode, {
          key: i,
          _active: i === current,
          _exit: i === current - 1,
          _step: i === current ? subStep : (lastStepBySlide.current[i] ?? 0),
        })
      )}
      <div class="progress">
        <div
          class="progress-bar"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
