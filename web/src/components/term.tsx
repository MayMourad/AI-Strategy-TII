import type { ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Term({ label, definition }: { label: ReactNode; definition: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <span className="cursor-help underline decoration-dotted decoration-muted-foreground/60 underline-offset-2">
              {label}
            </span>
          }
        />
        <TooltipContent className="max-w-64">{definition}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
