import { motion } from "motion/react"

const STATS = [
  {
    value: "~0.2%",
    caption: "of gnomAD's reference samples are of Middle Eastern ancestry.",
  },
  {
    value: "53%",
    caption:
      "of high-impact coding variants in a 2,116-person Middle East cohort were absent from gnomAD entirely (2022 study).",
  },
]

export function EvidenceSection() {
  return (
    <section id="evidence" className="scroll-mt-24 border-t border-border/60 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Why representation confidence matters
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="rounded-xl border border-border/70 bg-card/60 p-5"
                >
                  <div className="text-3xl font-semibold tracking-tight text-primary">{stat.value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4 text-muted-foreground"
          >
            <p>
              Global reference databases were built mostly from European-ancestry cohorts. A
              prioritization tool trained on them inherits that skew silently: it ranks a
              Gulf-ancestry variant with the same apparent confidence as a well-studied one, even
              when the underlying evidence base is thin.
            </p>
            <p>
              This prototype's second layer checks each variant's regional coverage instead of
              hiding the gap, and routes low-confidence rows to mandatory human review rather than
              letting a ranking pass through untouched. Expand any row in the results table above
              to see the gnomAD and ClinVar counts behind each confidence score.
            </p>
            <p className="border-t border-border/60 pt-4 text-xs text-muted-foreground/80">
              Sources: Ramaswamy et al., "Middle Eastern Genetic Variation Improves Clinical
              Annotation of the Human Genome," Journal of Personalized Medicine, 2022 (PMC8956070).
              Scheinfeldt et al., UAE population reference genome study, Frontiers in Genetics,
              2021.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
