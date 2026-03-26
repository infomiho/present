# Present

Presentation template built with Preact + Vite + Shiki.

## Structure

- `src/slides.tsx` - Presentation content. This is the main file to edit.
- `src/components/` - Reusable slide components (Deck, Slide, Code, Compare, PointList, QuestionList, ForkGrid, FileTree).
- `src/styles.css` - Theme and all component styles. CSS variables at the top control branding.
- `src/index.tsx` - Entry point. Renders the Deck with slides.

## Components

All components are exported from `src/components/index.ts`:

- `Deck` - Wraps all slides. Handles keyboard navigation and progress bar.
- `Slide` - Single slide with transitions. Props: `className`, `subSteps`. For progressive reveal, pass a render function as children: `<Slide subSteps={2}>{(step) => ...}</Slide>`
- `Code` - Shiki-powered syntax highlighting. Props: `lang`, `filename`. Children must be a string.
- `Compare` - Before/after side-by-side. Props: `before`, `after`, `beforeLabel`, `afterLabel`.
- `PointList` - Numbered bullet list. Props: `items` (array).
- `QuestionList` - Discussion questions with `?` badges. Props: `items` (array).
- `ForkGrid` + `ForkCard` - Two-option choice layout. `ForkCard` props: `title`, `highlighted`.
- `FileTree` + `Folder` + `File` - Directory tree visualization. `File` props: `name`, `active`, `dimmed`, `badges` (array of `{ label, color? }`).

## Theming

Edit CSS variables in `src/styles.css` `:root` block. Key variables:
- `--accent`, `--accent-rgb` - Primary brand color
- `--bg`, `--bg-surface`, `--bg-elevated` - Background shades
- `--text`, `--text-muted`, `--text-dim` - Text hierarchy

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Build to `dist/`
- `npm run preview` - Preview production build
