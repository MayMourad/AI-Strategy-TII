import { motion } from "motion/react"
import { ArrowRight, Dna, ListChecks, ShieldQuestion, Upload } from "lucide-react"

const STEPS = [
  {
    icon: Upload,
    label: "Input",
    title: "Variant list + optional ancestry metadata",
    body: "A batch of candidate variants from sequencing, plus which reference-ancestry cohort the patient or sample belongs to.",
  },
  {
    icon: ListChecks,
    label: "Layer 1",
    title: "Significance / pathogenicity ranking",
    body: "A standard classification model scores each variant's likely clinical or research significance, the way any prioritization tool would.",
  },
  {
    icon: ShieldQuestion,
    label: "Layer 2",
    title: "Representation-confidence scoring",
    body: "Cross-references each variant's genomic region against regional resources (UAE Reference Genome, Middle East Variation database) versus gnomAD/ClinVar coverage.",
  },
  {
    icon: Dna,
    label: "Output",
    title: "Dual-scored, human-checked ranking",
    body: "A ranked list carrying both scores. Low-confidence rows are routed to mandatory researcher review, never silently trusted.",
  },
]

export function SystemSection() {
  return (
    <section id="system" className="scroll-mt-24 border-t border-border/60 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How the auditor works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Two layers, not one. The second layer is the entire point: it exists to catch what
            the first layer cannot see about itself.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-xl border border-border/70 bg-card/60 p-5"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                  {step.label}
                </div>
                <div className="mt-1.5 text-sm font-semibold text-foreground">{step.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
                {i < STEPS.length - 1 ? (
                  <ArrowRight className="absolute top-5 -right-[22px] hidden size-4 text-border lg:block" />
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
