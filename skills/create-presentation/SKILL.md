---
name: create-presentation
description: Create a polished, code-forward presentation from scratch. Interviews you about your content, generates a Preact+Vite slide deck with Shiki syntax highlighting, then iterates on visual polish. Use when user wants to create a presentation, build slides, or prepare a talk.
---

You are creating a presentation for the user. Follow these phases in order.

## Phase 1: Intake

Ask these questions one at a time, waiting for answers:

1. **What's the topic?** What are you presenting, and what's the core message?
2. **Who's the audience?** Coworkers, conference, clients, students? What do they already know?
3. **Any reference material?** Existing docs, code, notes, or files you want to draw from?

## Phase 2: Content interview

Follow the interview process described in [references/grill-me.md](references/grill-me.md). Apply it specifically to the presentation content:

- What's the thesis? Do they have a recommendation or are they presenting options?
- What's the narrative arc? What order makes the ideas land?
- What are the key examples? Code, diagrams, comparisons?
- What are the honest downsides or open questions?
- What should the audience walk away with?

Keep going until you have a clear picture of every slide's purpose and content.

## Phase 3: Slide outline

Produce a table of slides:

| # | Title | Content summary |
|---|-------|----------------|

Ask the user to approve, adjust, or reorder before proceeding.

## Phase 4: Scaffold

Run these commands to pull the template and install dependencies:

```bash
npx giget@latest gh:infomiho/present ./<presentation-name>
cd <presentation-name>
npm install
```

Use a short, descriptive directory name based on the topic (e.g., `ts-config-talk`, `q3-roadmap`).

## Phase 5: Generate slides

Edit `src/slides.tsx` to create the presentation content. Key guidelines:

- **Read the existing template files first.** Understand the available components by reading `src/components/index.ts` and the individual component files.
- **Use the component library:** `Slide`, `Code`, `Compare`, `PointList`, `QuestionList`, `ForkGrid`/`ForkCard`, `FileTree`/`Folder`/`File`. See `src/components/` for the full API.
- **Code is Shiki-powered.** Use the `Code` component with the `lang` prop. Supports: typescript, javascript, tsx, jsx, json, bash, html, css, yaml, markdown. Add more languages by editing `src/components/Code.tsx`.
- **Sub-steps** for progressive reveal: `<Slide subSteps={N}>{(step) => ...}</Slide>`
- **Custom components** are encouraged. If a slide needs a visualization that doesn't fit the existing components, create it directly in `src/slides.tsx` or as a new component in `src/components/`.
- **Branding** is controlled by CSS variables in `src/styles.css`. The template ships a dark, code-forward theme. Adjust `--accent`, `--accent-rgb`, and related variables to match the user's brand if they ask.
- Keep slide content focused. One idea per slide.
- Use `className="centered"` on `Slide` for title/section slides.
- Use `<div class="slide-label">Label</div>` for the small label at the top of content slides.

## Phase 6: Review loop

Start the dev server:

```bash
npm run dev
```

Then tell the user:

> The presentation is running. Check it in your browser and send me screenshots of anything you want adjusted - layout, spacing, contrast, content, whatever. We'll iterate until you're happy.

For each piece of feedback:
1. Identify the specific file and CSS/component to change
2. Make the fix
3. Confirm what changed

Repeat until the user is satisfied.
