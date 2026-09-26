# Variant Prioritization & Representation-Confidence Auditor

A prototype built for a Grade 12 AI Strategy project. It mocks a decision-support tool for the
Technology Innovation Institute's Biotechnology Research Center (TII BRC): a variant-
prioritization system that ranks genetic variants by significance and flags how well the
reference databases (gnomAD, ClinVar) actually cover the patient's ancestry.

**This is an unaffiliated student prototype, not a real TII product.** All data, scores, and
confidence flags are simulated with deterministic mock logic client-side. There is no backend
and no external API calls.

Live site: `https://<username>.github.io/AI-Strategy-TII/`

## What it demonstrates

Selecting the **Gulf / Emirati cohort** ancestry context drops a meaningful share of variants to
Medium/Low representation confidence and flags them for manual review, mocking the real
gnomAD/ClinVar coverage gap for Middle Eastern populations (~0.2% of gnomAD samples; 53% of
high-impact variants in a 2022 Middle East cohort study were absent from gnomAD). Selecting the
**European reference cohort** context keeps confidence mostly High, by design, to make the
contrast visible in two clicks.

Beyond the mock ranking, the tool also:
- Runs a simulated multi-stage pipeline (load batch, rank significance, cross-reference
  reference panels, score confidence) with a live progress stepper.
- Lets you expand any variant row for its underlying gnomAD/ClinVar evidence.
- Charts the High/Medium/Low confidence distribution per run.
- Exports the current run as a CSV report.
- Keeps a session-local run history.

## Project structure

```
index.html, assets/        Built static site (what GitHub Pages actually serves)
web/                        Source: Vite + React + TypeScript + Tailwind v4 + shadcn/ui
```

The root-level `index.html`/`assets/` are the production build output of `web/`, committed
directly so GitHub Pages can serve the site with zero configuration (Settings > Pages > Deploy
from a branch > `main` > `/ (root)`).

## Develop

```bash
cd web
pnpm install
pnpm dev
```

## Rebuild and deploy

```bash
cd web
pnpm build
cp -r dist/. ..
```

Commit and push the updated root `index.html`/`assets/` alongside any source changes in `web/`.

## Stack notes

- **3D DNA helix**: hand-rolled with vanilla Three.js (not `@react-three/fiber` — its custom
  renderer did not commit any scene content under this project's React 19.3 pin, confirmed by a
  raw Three.js smoke test that rendered fine). Driven from a `useEffect` in
  `web/src/components/three/dna-helix.tsx`.
- **UI**: shadcn/ui components. The nav's expandable icon tabs are a hand-built equivalent of
  Skiper UI's `skiper96` ("Expandable Tabs Navigation") — that component is gated behind a paid
  Skiper UI Pro license, which this project does not have.

## Sources cited in the prototype

- Ramaswamy et al., "Middle Eastern Genetic Variation Improves Clinical Annotation of the Human
  Genome," *Journal of Personalized Medicine*, 2022 (PMC8956070).
- Scheinfeldt et al., UAE population reference genome study, *Frontiers in Genetics*, 2021.
