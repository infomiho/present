import {
  Slide, Code, Compare, PointList, QuestionList,
  ForkGrid, ForkCard, FileTree, Folder, File,
} from './components'

export const slides = [
  <Slide className="centered">
    <h1>Your <span class="accent">Presentation</span></h1>
    <p>Replace these example slides with your content</p>
    <div class="subtitle">arrow keys to navigate</div>
  </Slide>,

  <Slide>
    <div class="slide-label">Components</div>
    <h2>What's in the box</h2>
    <PointList items={[
      'Code blocks with Shiki syntax highlighting',
      'Before/after comparisons',
      'File tree visualizations with colored badges',
      'Fork grids for presenting choices',
      'Question lists for discussion slides',
      'Sub-step progressive reveal on any slide',
    ]} />
  </Slide>,

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

  <Slide>
    <div class="slide-label">Choices</div>
    <h2>The fork in the road</h2>
    <ForkGrid>
      <ForkCard title="Option A" highlighted>
        <p>The bold approach. Fewer moving parts, more opinionated, requires buy-in from the team.</p>
      </ForkCard>
      <ForkCard title="Option B">
        <p>The safe approach. Incremental adoption, lower risk, but doesn't unlock the full potential.</p>
      </ForkCard>
    </ForkGrid>
  </Slide>,

  <Slide>
    <div class="slide-label">Structure</div>
    <h2>Project layout</h2>
    <FileTree>
      <Folder name="src">
        <File name="index.tsx" active badges={[{ label: 'entry' }]} />
        <File name="slides.tsx" active badges={[{ label: 'content', color: '#82aaff' }]} />
        <Folder name="components">
          <File name="Deck.tsx" active badges={[{ label: 'nav', color: '#c792ea' }]} />
          <File name="Code.tsx" active badges={[{ label: 'shiki', color: '#c3e88d' }]} />
          <File name="Compare.tsx" active />
          <File name="FileTree.tsx" active />
        </Folder>
        <File name="styles.css" active badges={[{ label: 'theme' }]} />
      </Folder>
    </FileTree>
  </Slide>,

  <Slide subSteps={2}>
    {(step) => (
      <>
        <div class="slide-label">Sub-steps</div>
        <h2>Progressive reveal</h2>
        <PointList items={[
          'This point is always visible',
          ...(step >= 1 ? ['This appears on the first arrow press'] : []),
          ...(step >= 2 ? ['And this on the second'] : []),
        ]} />
      </>
    )}
  </Slide>,

  <Slide>
    <div class="slide-label">Discussion</div>
    <h2>Open questions</h2>
    <QuestionList items={[
      'What do you think about this approach?',
      'Where should we go from here?',
      'What are we missing?',
    ]} />
  </Slide>,
]
