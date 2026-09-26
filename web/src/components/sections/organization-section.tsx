import { motion } from "motion/react"
import { Building2, TriangleAlert } from "lucide-react"
import { OrgEmblem } from "@/components/three/org-emblem"
import { RepresentationGrid } from "@/components/organization/representation-grid"
import { Term } from "@/components/term"

export function OrganizationSection() {
  return (
    <section id="organization" className="scroll-mt-24 border-t border-border/60 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 flex items-center gap-5">
          <OrgEmblem className="size-16 shrink-0 sm:size-20" />
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The organization, and the real problem
            </h2>
            <p className="mt-2 text-muted-foreground">
              This project targets one real organization with one real, present-day gap in its
              own genomics pipeline. Nothing here is generic.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-border/70 bg-card/60 p-6"
          >
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-4" />
            </div>
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Organization
            </h3>
            <p className="mt-2 text-lg font-medium text-foreground">
              Technology Innovation Institute &mdash; Biotechnology Research Center (TII BRC)
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The applied-research pillar of Abu Dhabi's Advanced Technology Research Council
              (ATRC). BRC's stated mandate is advancing healthcare outcomes through molecular and
              genomics strategies and AI-enhanced bioinformatics, for a population that is
              overwhelmingly Emirati and Gulf Arab.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-confidence-low/30 bg-confidence-low/5 p-6"
          >
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-confidence-low/10 text-confidence-low">
              <TriangleAlert className="size-4" />
            </div>
            <h3 className="text-sm font-semibold tracking-wide text-confidence-low uppercase">
              The problem
            </h3>
            <p className="mt-2 text-lg font-medium text-foreground">
              BRC's AI variant-prioritization tools inherit a Western-genome blind spot
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              BRC's genomics work depends on AI tools trained on{" "}
              <Term
                label="gnomAD"
                definition="Genome Aggregation Database: the most widely used public reference database of human genetic variation, compiled mostly from studies of European-ancestry cohorts."
              />{" "}
              and{" "}
              <Term
                label="ClinVar"
                definition="A public NIH archive linking genetic variants to reported health conditions, used to help classify whether a variant is likely benign or pathogenic."
              />{" "}
              &mdash; reference databases built almost entirely from European-ancestry cohorts. Middle
              Eastern genomes make up roughly <strong className="text-foreground">0.2%</strong> of
              gnomAD. A standard tool inherits that blind spot precisely where BRC's own
              population is concerned.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
        >
          <RepresentationGrid />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Every mock variant, score, and confidence flag in the tool below is built to make this
          one organization-specific gap visible and testable, not to illustrate a generic AI
          concept.
        </motion.p>
      </div>
    </section>
  )
}
