import {
  Slide, Code, MagicCode, Compare, PointList, QuestionList,
  ForkGrid, ForkCard, FileTree, Folder, File,
} from '../components'
import { stack, snapIn } from './layout'

const codeV1 = `
interface User {
  id: string
  name: string
}
`

const codeV2 = `
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}
`

const codeV3 = `
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}

function createUser(data: Omit<User, 'id' | 'createdAt'>): User {
  return { ...data, id: crypto.randomUUID(), createdAt: new Date() }
}
`

export const contentSlides = [
  <Slide>
    <div class="slide-label">Code</div>
    <h2>Syntax highlighting</h2>
    <Code lang="typescript" filename="example.ts">{`
interface User {
  id: string
  name: string
  email: string
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('/api/users')
  return response.json()
}
    `}</Code>
  </Slide>,

  <Slide subSteps={2}>
    {(step: number) => (
      <>
        <div class="slide-label">Code walkthrough</div>
        <h2>Line highlighting</h2>
        <Code
          lang="typescript"
          filename="api.ts"
          lineNumbers
          highlight={step === 1 ? "1-4" : step === 2 ? "6-9" : undefined}
        >{`
interface User {
  id: string
  name: string
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('/api/users')
  return response.json()
}
        `}</Code>
      </>
    )}
  </Slide>,

  <Slide subSteps={2}>
    {(step: number) => (
      <>
        <div class="slide-label">Progressive code</div>
        <h2>Animated line reveals</h2>
        <Code
          lang="typescript"
          filename="progressive.ts"
          step={step}
          lineGroups={[
            { lines: "5-6", visibleFrom: 1 },
            { lines: "8-11", visibleFrom: 2 },
          ]}
        >{`
interface Config {
  port: number
  host: string
  debug: boolean
  db: string
  dbPoolSize: number

  auth: {
    secret: string
    expiry: number
  }
}
        `}</Code>
      </>
    )}
  </Slide>,

  <Slide subSteps={2}>
    {(step: number) => (
      <>
        <div class="slide-label">Magic move</div>
        <h2>Code morphing</h2>
        <MagicCode
          codes={[codeV1, codeV2, codeV3]}
          step={step}
          highlights={[undefined, '4-5', '6-12']}
        />
      </>
    )}
  </Slide>,

  <Slide>
    <div class="slide-label">Comparison</div>
    <h2>Before and after</h2>
    <Compare
      before={
        <Code lang="javascript">{`
const name = config.get("name")
const port = config.get("port")
const debug = config.get("debug")
        `}</Code>
      }
      after={
        <Code lang="typescript">{`
const { name, port, debug } = config
        `}</Code>
      }
    />
  </Slide>,

  <Slide subSteps={1}>
    {(step: number) => (
      <>
        <div class="slide-label">Layout helpers</div>
        <h2>Crossfade with stack</h2>
        <div style={stack}>
          <div style={snapIn(step === 0)}>
            <Code lang="typescript">{`
const x = 1
            `}</Code>
          </div>
          <div style={snapIn(step === 1)}>
            <Code lang="typescript">{`
const x = 42
            `}</Code>
          </div>
        </div>
      </>
    )}
  </Slide>,

  <Slide subSteps={1}>
    {(step: number) => (
      <>
        <div class="slide-label">Decision</div>
        <h2>The fork in the road</h2>
        <ForkGrid>
          <ForkCard title="Option A" highlighted={step >= 1}>
            <p>The bold approach. Fewer moving parts, more opinionated.</p>
          </ForkCard>
          <ForkCard title="Option B" dimmed={step >= 1}>
            <p>The safe approach. Incremental adoption, lower risk.</p>
          </ForkCard>
        </ForkGrid>
      </>
    )}
  </Slide>,

  <Slide>
    <div class="slide-label">Structure</div>
    <h2>Project layout</h2>
    <FileTree>
      <Folder name="src">
        <File name="index.tsx" active badges={[{ label: 'entry' }]} />
        <Folder name="slides">
          <File name="index.ts" active badges={[{ label: 'content', color: '#82aaff' }]} />
          <File name="layout.ts" active badges={[{ label: 'helpers', color: '#c3e88d' }]} />
          <File name="intro.tsx" active />
          <File name="content.tsx" active />
        </Folder>
        <Folder name="components">
          <File name="Deck.tsx" active badges={[{ label: 'nav', color: '#c792ea' }]} />
          <File name="Code.tsx" active badges={[{ label: 'shiki', color: '#c3e88d' }]} />
          <File name="MagicCode.tsx" active badges={[{ label: 'animate', color: '#ffcb6b' }]} />
        </Folder>
        <File name="styles.css" active badges={[{ label: 'theme' }]} />
      </Folder>
    </FileTree>
  </Slide>,

  <Slide subSteps={2}>
    {(step: number) => (
      <>
        <div class="slide-label">Sub-steps</div>
        <h2>Progressive reveal</h2>
        <PointList step={step} items={[
          'This point is always visible',
          'This appears on the first arrow press',
          'And this on the second',
        ]} />
      </>
    )}
  </Slide>,

  <Slide subSteps={2}>
    {(step: number) => (
      <>
        <div class="slide-label">Discussion</div>
        <h2>Open questions</h2>
        <QuestionList step={step} items={[
          'What do you think about this approach?',
          'Where should we go from here?',
          'What are we missing?',
        ]} />
      </>
    )}
  </Slide>,
]
