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
}: {
  children: string
  lang?: string
  filename?: string
  lineNumbers?: boolean
  highlight?: string
}) {
  const [tokens, setTokens] = useState<Token[][] | null>(null)

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

  const highlightedLines = highlight ? parseHighlight(highlight) : null

  return (
    <div class="code-block">
      {filename && <div class="code-filename">{filename}</div>}
      <div class="code-content">
        {tokens ? (
          <div class="code-lines">
            {tokens.map((line, i) => {
              const lineNum = i + 1
              const isHighlighted = highlightedLines?.has(lineNum)
              const isDimmed = highlightedLines && !isHighlighted
              const cls = [
                'code-line',
                isHighlighted && 'highlighted',
                isDimmed && 'dimmed',
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
