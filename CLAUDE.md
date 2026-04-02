# Present

Presentation template built with Preact + Vite + Shiki.

## Structure

- `src/slides/` - Presentation content, organized by section:
  - `index.ts` - Combines all slide groups into the final array.
  - `layout.ts` - Shared style objects (`twoCol`, `colLabel`, `fadeIn`, `snapIn`, `stack`).
  - `intro.tsx` - Example title slides.
  - `content.tsx` - Example content slides demonstrating all components.
- `src/components/` - Reusable slide components (Deck, Slide, Code, MagicCode, Compare, PointList, QuestionList, ForkGrid, FileTree).
- `src/styles.css` - Theme and all component styles. CSS variables at the top control branding.
- `src/index.tsx` - Entry point. Renders the Deck with slides.

## Components

All components are exported from `src/components/index.ts`:

- `Deck` - Wraps all slides. Handles keyboard navigation, phase-based progress bar, and slide counter.
- `Slide` - Single slide container. Props: `className`, `subSteps`. For progressive reveal, pass a render function as children: `<Slide subSteps={2}>{(step) => ...}</Slide>`
- `Code` - Shiki-powered syntax highlighting. Props: `lang`, `filename`, `lineNumbers` (boolean), `highlight` (range string like `"3-5, 8"`). Children must be a string.
  - **lineGroups**: For animated progressive line reveals. Array of `{ lines, visibleFrom, visibleUntil?, noHighlight?, swap? }`. Used with `step` prop. Lines expand/collapse with staggered height + opacity transitions.
- `MagicCode` - Animated code morphing using Shiki Magic Move. Props: `codes` (array of code strings), `step`, `highlights` (array of range strings per step), `lang`, `theme`, `options`. Smoothly animates tokens between code versions.
- `Compare` - Before/after side-by-side. Props: `before`, `after`, `beforeLabel`, `afterLabel`.
- `PointList` - Bullet list. Props: `items` (array), `numbered` (boolean, default true - set false for plain dots), `step` (number - progressive reveal).
- `QuestionList` - Discussion questions with `?` badges. Props: `items` (array), `step` (number - progressive reveal).
- `ForkGrid` + `ForkCard` - Two-option decision layout. `ForkCard` props: `title`, `highlighted`, `dimmed`.
- `FileTree` + `Folder` + `File` - Directory tree visualization. `File` props: `name`, `active`, `dimmed`, `badges` (array of `{ label, color? }`).

## Layout Helpers

Exported from `src/slides/layout.ts`:

- `twoCol` - CSS grid style for two-column layouts.
- `colLabel` - Style for column header labels (monospace, uppercase, dim).
- `fadeIn(visible)` - Opacity transition helper for sub-step reveals.
- `snapIn(visible)` - Grid-area overlay positioning for stacking/crossfading views.
- `stack` - CSS grid container for overlaying elements in the same cell. Use with `snapIn`.

## Theming

Edit CSS variables in `src/styles.css` `:root` block. Key variables:
- `--accent`, `--accent-rgb` - Primary brand color
- `--bg`, `--bg-surface`, `--bg-elevated` - Background shades
- `--text`, `--text-muted`, `--text-dim` - Text hierarchy

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Build to `dist/`
- `npm run preview` - Preview production build
