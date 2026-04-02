import { useState, useEffect } from 'preact/hooks'
import { createHighlighter, type HighlighterCore } from 'shiki'

type Token = { content: string; color?: string }

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter(lang: string) {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark'],
      langs: [lang],
    })
  }
  return highlighterPromise.then(async h => {
    await h.loadLanguage(lang)
    return h
  })
}

function parseHighlight(highlight: string): Set<number> {
  const lines = new Set<number>()
  for (const part of highlight.split(',')) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number)
      for (let i = start; i <= end; i++) lines.add(i)
    } else {
      lines.add(Number(trimmed))
    }
  }
  return lines
}

export function Code({
  children,
  lang = 'typescript',
  filename,
  lineNumbers,
  highlight,
  lineGroups,
  step,
}: {
  children: string
  lang?: string
  filename?: string
  lineNumbers?: boolean
  highlight?: string
  lineGroups?: Array<{ lines: string; visibleFrom: number; visibleUntil?: number; noHighlight?: boolean; swap?: boolean }>
  step?: number
}) {
  const [tokens, setTokens] = useState<Token[][] | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    getHighlighter(lang).then(h => {
      if (!cancelled) {
        const result = h.codeToTokens(children.trim(), { lang, theme: 'vitesse-dark' })
        setTokens(result.tokens as Token[][])
      }
    })
    return () => { cancelled = true }
  }, [children, lang])

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const highlightedLines = highlight ? parseHighlight(highlight) : null

  const lineVis = new Map<number, { visibleFrom: number; visibleUntil?: number; noHighlight?: boolean; swap?: boolean }>()
  if (lineGroups) {
    for (const group of lineGroups) {
      for (const ln of parseHighlight(group.lines)) {
        lineVis.set(ln, { visibleFrom: group.visibleFrom, visibleUntil: group.visibleUntil, noHighlight: group.noHighlight, swap: group.swap })
      }
    }
  }

  return (
    <div class="code-block">
      {filename && <div class="code-filename">{filename}</div>}
      <div class="code-content">
        {tokens ? (
          <div class="code-lines">
            {tokens.map((line, i) => {
              const lineNum = i + 1
              const vis = lineVis.get(lineNum)
              const isAnimated = vis !== undefined
              const isVisible = !isAnimated || (
                step !== undefined &&
                step >= vis.visibleFrom &&
                (vis.visibleUntil === undefined || step <= vis.visibleUntil)
              )
              const isHighlighted = highlightedLines?.has(lineNum) || (isAnimated && isVisible && vis.visibleFrom > 0 && !vis.noHighlight)
              const cls = [
                'code-line',
                isHighlighted && 'highlighted',
                isAnimated && 'animated',
                isAnimated && !mounted && 'no-transition',
                isAnimated && vis.swap && 'swap',
                isAnimated && (isVisible ? 'expanded' : 'collapsed'),
              ].filter(Boolean).join(' ')
              return (
                <div key={i} class={cls}>
                  {lineNumbers && <span class="code-ln">{lineNum}</span>}
                  <span class="code-line-content">
                    {line.map((token, j) => (
                      <span key={j} style={{ color: token.color }}>{token.content}</span>
                    ))}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <pre><code>{children.trim()}</code></pre>
        )}
      </div>
    </div>
  )
}
