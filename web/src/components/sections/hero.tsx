import { motion } from "motion/react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SplineEmbed } from "@/components/three/spline-embed"

const SPLINE_DNA_URL = "https://my.spline.design/3ddna-d9AcMkA8mK2jbQ59gjomhMlR/"

export function Hero() {
  return (
    <section id="overview" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 42%, rgba(45,212,196,0.14), transparent 65%), radial-gradient(45% 45% at 15% 85%, rgba(91,143,201,0.10), transparent 70%)",
        }}
      />

      <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-25 sm:w-[60%] sm:opacity-100 lg:w-[52%]">
        <SplineEmbed url={SPLINE_DNA_URL} className="h-full w-full" title="3D DNA double helix" />
      </div>
      <div className="absolute inset-y-0 right-0 -z-10 w-full bg-gradient-to-r from-background via-background/70 to-background/50 sm:via-background/85 sm:to-transparent sm:w-[70%]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary"
          >
            Prototype &middot; simulated data, not a diagnostic tool
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Variant prioritization,
            <br />
            with its blind spots on display.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Ranks candidate genetic variants by clinical significance, and pairs every ranking
            with a confidence score showing how well the reference databases actually cover the
            patient's ancestry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.19, ease: [0.23, 1, 0.32, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="gap-2"
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
            >
              Run the diagnostic
              <ArrowDown className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Concept target: Technology Innovation Institute, Biotechnology Research Center
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 text-xs text-muted-foreground/60"
          >
            May Ahmed Mourad &middot; G12D
          </motion.p>
        </div>
      </div>
    </section>
  )
}
