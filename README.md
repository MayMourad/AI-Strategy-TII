# Variant Prioritization & Representation-Confidence Auditor

A single-file prototype built for a Grade 12 AI Strategy project. It mocks a decision-support
tool for the Technology Innovation Institute's Biotechnology Research Center (TII BRC): a
variant-prioritization system that ranks genetic variants by significance and flags how well
the reference databases (gnomAD, ClinVar) actually cover the patient's ancestry.

**This is an unaffiliated student prototype, not a real TII product.** All data, scores, and
confidence flags are simulated with deterministic mock logic client-side. There is no backend,
no build step, and no external API calls.

## Run it

Open [`index.html`](index.html) directly in a browser, or serve the folder with any static
file server. No installation needed.

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`,
   folder `/ (root)`.
4. Save. GitHub publishes the site at `https://<username>.github.io/<repo-name>/` within a
   minute or two.

## What it demonstrates

Selecting the **Gulf / Emirati cohort** ancestry context drops a meaningful share of variants
to Medium/Low representation confidence and flags them for manual review, mocking the real
gnomAD/ClinVar coverage gap for Middle Eastern populations (~0.2% of gnomAD samples; 53% of
high-impact variants in a 2022 Middle East cohort study were absent from gnomAD). Selecting
the **European reference cohort** context keeps confidence mostly High, by design, to make the
contrast visible in under three clicks.

## Sources cited in the prototype

- Ramaswamy et al., "Middle Eastern Genetic Variation Improves Clinical Annotation of the
  Human Genome," *Journal of Personalized Medicine*, 2022 (PMC8956070).
- Scheinfeldt et al., UAE population reference genome study, *Frontiers in Genetics*, 2021.
