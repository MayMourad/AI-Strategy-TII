import { motion } from "motion/react"
import { CircleX, Gauge, Network, ShieldAlert, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const EVALUATION = [
  {
    icon: Gauge,
    label: "Performance",
    body: "Reliable for variants well-covered by existing databases; measurably weaker on Gulf/Emirati-specific variants, exactly the population BRC exists to serve. Performance is not uniform, which is the finding this system surfaces rather than hides.",
  },
  {
    icon: ShieldAlert,
    label: "Risk",
    body: "The main risk is false confidence: silent misclassification on underrepresented variants could mislead research or, downstream, clinical interpretation. Secondary risks: sensitive genomic data governance, and researcher over-reliance on AI rankings without follow-up validation.",
  },
  {
    icon: TrendingUp,
    label: "Scalability",
    body: "As BRC's own sequencing volume grows through its Biofoundry and national efforts such as the Emirati Genome Program (700,000+ participants sequenced as of 2025), the confidence layer can absorb more local reference data over time, a flywheel where more regional use narrows the blind spot instead of widening it.",
  },
]

const ALTERNATIVES = [
  {
    option: "Do not adopt, keep manual review only",
    reason: "Too slow to scale with BRC's growing sequencing volume.",
  },
  {
    option: "Adopt as-is, without the confidence layer",
    reason: "Would encode the same gnomAD bias silently, undermining BRC's own regional mission.",
  },
  {
    option: "Wait for global databases to close the gap organically",
    reason:
      "Underrepresentation has persisted for years; BRC's own Biofoundry investment and national programs give it more leverage building this now.",
  },
]

const SOURCES = [
  {
    citation:
      "Abou Tayoun, A. N. & Rehm, H. L. “Genetic variation in the Middle East — an opportunity to advance the human genetics field.” Genome Medicine, 2020.",
  },
  {
    citation:
      "Ramaswamy, S. et al. “Middle Eastern Genetic Variation Improves Clinical Annotation of the Human Genome.” Journal of Personalized Medicine, 2022 (PMC8956070).",
  },
  {
    citation:
      "Daw Elbait, G., Henschel, A., Tay, G. K. & Al Safar, H. S. “A Population-Specific Major Allele Reference Genome From the United Arab Emirates Population.” Frontiers in Genetics, 2021.",
  },
  {
    citation:
      "Kore, P. et al. “Improved Allele Frequencies in gnomAD through Local Ancestry Inference.” Nature Communications, 2025.",
  },
  {
    citation:
      "Cheng, J. et al. “Accurate Proteome-Wide Missense Variant Effect Prediction with AlphaMissense.” Science, 381(6664), 2023.",
  },
]

export function EvaluationSection() {
  return (
    <section id="evaluation" className="scroll-mt-24 border-t border-border/60 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Evaluating the system
          </h2>
          <p className="mt-2 text-muted-foreground">
            Performance, risk, and scalability, the three lenses a real adoption decision has to
            survive.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {EVALUATION.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-xl border border-border/70 bg-card/60 p-5"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border/70 bg-card/60 p-5"
          >
            <div className="text-3xl font-semibold tracking-tight text-primary">~0.2%</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              of gnomAD's reference samples are of Middle Eastern ancestry.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="rounded-xl border border-border/70 bg-card/60 p-5"
          >
            <div className="text-3xl font-semibold tracking-tight text-primary">53%</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              of high-impact coding variants in a 2,116-person Middle East cohort were absent from
              gnomAD entirely (2022 study).
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary text-primary-foreground">Recommendation</Badge>
            <h3 className="text-lg font-semibold text-foreground">Adopt with changes</h3>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Adopt as a decision-support layer, not an autonomous classifier, conditional on
            integrating a Middle East/UAE-specific reference layer (UAE Reference Genome, Emirati
            Genome Program, Middle East Variation database) alongside gnomAD/ClinVar, and
            enforcing mandatory human review on every low-confidence flag before a ranking is
            acted on.
          </p>

          <div className="mt-5 border-t border-primary/20 pt-5">
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Alternatives considered
            </div>
            <ul className="mt-3 space-y-3">
              {ALTERNATIVES.map((alt) => (
                <li key={alt.option} className="flex items-start gap-2.5 text-sm">
                  <CircleX className="mt-0.5 size-4 shrink-0 text-confidence-low" />
                  <span>
                    <span className="text-foreground">{alt.option}</span>
                    <span className="text-muted-foreground"> &mdash; rejected: {alt.reason}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <Network className="size-3.5" />
            Sources
          </div>
          <ol className="space-y-2 border-t border-border/60 pt-4">
            {SOURCES.map((s, i) => (
              <li key={i} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-mono text-muted-foreground/60">[{i + 1}]</span>
                <span>{s.citation}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
