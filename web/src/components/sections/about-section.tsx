export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border/60 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-lg font-semibold text-foreground">About this prototype</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              This is an unaffiliated student prototype built for a Grade 12 AI strategy
              assignment. It is not affiliated with, endorsed by, or reviewed by the Technology
              Innovation Institute or its Biotechnology Research Center. All variant identifiers,
              scores, and confidence flags on this page are simulated with deterministic mock
              logic for demonstration only and do not reflect real genomic analysis or clinical
              data.
            </p>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            <div>Prepared for a Grade 12 AI Strategy Project</div>
            <div className="mt-1">Deadline: 30 September 2026</div>
          </div>
        </div>
      </div>
    </section>
  )
}
