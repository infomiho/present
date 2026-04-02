import { useState, useEffect } from 'preact/hooks'
import { ShikiMagicMove } from 'shiki-magic-move/react'
import { createHighlighter, type HighlighterCore } from 'shiki'
import 'shiki-magic-move/dist/style.css'

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter(lang: string) {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark'],
      langs: [lang],
    }) as Promise<HighlighterCore>
  }
  return highlighterPromise.then(async h => {
    await h.loadLanguage(lang)
    return h
  })
}

function parseRange(range: string): { start: number; end: number } {
  if (range.includes('-')) {
    const [start, end] = range.split('-').map(Number)
    return { start, end }
  }
  const n = Number(range)
  return { start: n, end: n }
}

export function MagicCode({
  codes,
  step = 0,
  highlights,
  lang = 'typescript',
  theme = 'vitesse-dark',
  options,
}: {
  codes: string[]
  step?: number
  highlights?: (string | undefined)[]
  lang?: string
  theme?: string
  options?: Record<string, unknown>
}) {
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null)
  const [lastPos, setLastPos] = useState<{ start: number; end: number } | null>(null)

  useEffect(() => {
    getHighlighter(lang).then(setHighlighter)
  }, [lang])

  const code = codes[Math.min(step, codes.length - 1)].trim()
  const hlStr = highlights?.[Math.min(step, (highlights?.length ?? 1) - 1)]
  const highlight = hlStr ? parseRange(hlStr) : null

  useEffect(() => {
    if (highlight) setLastPos(highlight)
  }, [hlStr])

  if (!highlighter) return <pre class="magic-code-fallback"><code>{code}</code></pre>

  const pos = highlight || lastPos
  return (
    <div class="code-block magic-code">
      {pos && (
        <div
          class="magic-code-highlight"
          style={{
            top: `calc(22px + ${(pos.start - 1) * 1.47}rem)`,
            height: `${(pos.end - pos.start + 1) * 1.47}rem`,
            opacity: highlight ? 1 : 0,
          }}
        />
      )}
      <ShikiMagicMove
        highlighter={highlighter}
        code={code}
        lang={lang}
        theme={theme}
        options={{
          duration: 600,
          stagger: 0,
          animateContainer: true,
          ...options,
        }}
      />
    </div>
  )
}
