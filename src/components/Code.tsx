import { useState, useEffect } from 'preact/hooks'
import { createHighlighter, type HighlighterCore } from 'shiki/bundle/web'

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark'],
      langs: [
        'typescript', 'javascript', 'tsx', 'jsx',
        'json', 'bash', 'html', 'css',
        'yaml', 'markdown',
      ],
    })
  }
  return highlighterPromise
}

export function Code({
  children,
  lang = 'typescript',
  filename,
}: {
  children: string
  lang?: string
  filename?: string
}) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let cancelled = false
    getHighlighter().then(h => {
      if (!cancelled) {
        setHtml(h.codeToHtml(children.trim(), { lang, theme: 'vitesse-dark' }))
      }
    })
    return () => { cancelled = true }
  }, [children, lang])

  return (
    <div class="code-block">
      {filename && <div class="code-filename">{filename}</div>}
      <div class="code-content">
        {html
          ? <div dangerouslySetInnerHTML={{ __html: html }} />
          : <pre><code>{children.trim()}</code></pre>
        }
      </div>
    </div>
  )
}
