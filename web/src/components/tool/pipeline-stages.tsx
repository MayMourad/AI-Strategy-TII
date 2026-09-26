import { motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const PIPELINE_STAGES = [
  "Loading variant batch",
  "Running significance ranking",
  "Cross-referencing reference panels",
  "Scoring representation confidence",
] as const

export function PipelineStages({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="grid gap-2.5 sm:grid-cols-2">
      {PIPELINE_STAGES.map((stage, i) => {
        const done = i < activeIndex
        const current = i === activeIndex
        return (
          <li
            key={stage}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors duration-200",
              done && "border-primary/25 bg-primary/5 text-foreground",
              current && "border-primary/40 bg-primary/10 text-foreground",
              !done && !current && "border-border/70 text-muted-foreground",
            )}
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-current/30">
              {done ? (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Check className="size-3 text-primary" />
                </motion.span>
              ) : current ? (
                <Loader2 className="size-3 animate-spin text-primary" />
              ) : (
                <span className="size-1.5 rounded-full bg-current/40" />
              )}
            </span>
            {stage}
          </li>
        )
      })}
    </ol>
  )
}
