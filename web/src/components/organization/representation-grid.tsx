import { motion } from "motion/react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TOTAL = 500
const HIGHLIGHT_INDEX = 249

export function RepresentationGrid() {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-6">
      <div className="mb-4">
        <div className="text-sm font-semibold text-foreground">
          What ~0.2% actually looks like
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Every square is one gnomAD reference sample. Exactly one in this grid of 500 is of
          Middle Eastern ancestry.
        </p>
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: "repeat(25, minmax(0, 1fr))" }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          if (i === HIGHLIGHT_INDEX) {
            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="aspect-square rounded-[2px] bg-confidence-medium shadow-[0_0_8px_rgba(242,184,75,0.7)]"
                      />
                    }
                  />
                  <TooltipContent>This sample: Middle Eastern ancestry, ~1 in 500</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.0008, 0.4) }}
              title="This sample: represented in gnomAD's reference panel"
              className="aspect-square rounded-[2px] bg-[#2c3e54] transition-colors hover:bg-[#3d5570]"
            />
          )
        })}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground/70">
        Illustrative 1-in-500 grid derived from the ~0.2% figure cited above. Source: Ramaswamy et
        al., 2022.
      </p>
    </div>
  )
}
