# 7ka.dev

Public-facing site for a small anonymous engineering collective. Built as a layered terminal experience — the user arrives at a gateway machine, thinks they are the intruder. They are not.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Zustand
- d3-geo + topojson (field map)

## Structure

```
src/
  app/          — root, routing between machines
  pages/
    gateway/    — terminal entry point (GatewayMachine)
    mainframe/  — inner OS shell (MainframeMachine)
  widgets/      — UI shells: terminal, OS chrome, windows, sidebar
  features/     — terminal command resolution, input handling
  entities/     — agent and operation data models
  shared/       — store, config, lib utilities, shared UI
```

## Architecture

Two machines, one store:

- **gateway** — pseudo OS chrome (macOS or Windows, detected via userAgent) wrapping a green-phosphor terminal. Entry point for all users.
- **mainframe** — amber-phosphor OS shell with file explorer UI, opened via SSH from the terminal (`ssh unit7`).

Windows within the mainframe are managed by `useWindowManager` — multiple windows, draggable, focusable, cascading.

## Dev

```bash
npm install
npm run dev
```

## Deploy

Deploys automatically to GitHub Pages on push to `master` via GitHub Actions. See `.github/workflows/deploy.yml`.

```bash
npm run build   # build only
```

## Content

Agent bios, operation names, and collective copy are placeholders (`[PLACEHOLDER]`). Content is managed in:

- `src/entities/agent/model.ts`
- `src/entities/operation/model.ts`
- `src/shared/config/` — ASCII logo, boot sequence copy