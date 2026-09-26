import { AnimatePresence, motion } from "motion/react"
import { Download, FlaskConical, History } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { BATCHES, type Ancestry, confidenceFor } from "@/data/variants"
import { ConfidenceChart } from "@/components/tool/confidence-chart"
import { PIPELINE_STAGES, PipelineStages } from "@/components/tool/pipeline-stages"
import { ResultsTable } from "@/components/tool/results-table"

interface RunRecord {
  id: string
  batchLabel: string
  ancestry: Ancestry
  flagged: number
  total: number
  time: string
}

const STAGE_INTERVAL_MS = 420

export function ToolSection() {
  const [batchId, setBatchId] = useState(BATCHES[0].id)
  const [ancestry, setAncestry] = useState<Ancestry | "">("")
  const [stageIndex, setStageIndex] = useState<number>(-1)
  const [ranAncestry, setRanAncestry] = useState<Ancestry | null>(null)
  const [ranBatchId, setRanBatchId] = useState<string | null>(null)
  const [history, setHistory] = useState<RunRecord[]>([])
  const timerRef = useRef<number | null>(null)

  const batch = BATCHES.find((b) => b.id === batchId) ?? BATCHES[0]
  const isRunning = stageIndex >= 0 && stageIndex < PIPELINE_STAGES.length
  const hasResult = ranAncestry !== null && ranBatchId !== null && !isRunning

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  function runPrioritization() {
    if (!ancestry) return
    setRanAncestry(null)
    setStageIndex(0)
    const currentBatchId = batchId
    const currentAncestry = ancestry

    let step = 0
    timerRef.current = window.setInterval(() => {
      step += 1
      if (step >= PIPELINE_STAGES.length) {
        if (timerRef.current) window.clearInterval(timerRef.current)
        setStageIndex(PIPELINE_STAGES.length)
        setRanBatchId(currentBatchId)
        setRanAncestry(currentAncestry)

        const targetBatch = BATCHES.find((b) => b.id === currentBatchId) ?? BATCHES[0]
        const flagged = targetBatch.variants.filter(
          (v) => confidenceFor(v, currentAncestry) === "low",
        ).length

        setHistory((prev) => [
          {
            id: `${Date.now()}`,
            batchLabel: targetBatch.label,
            ancestry: currentAncestry,
            flagged,
            total: targetBatch.variants.length,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
          ...prev,
        ].slice(0, 5))

        toast(
          flagged > 0
            ? `${flagged} of ${targetBatch.variants.length} variants flagged for manual review`
            : "Run complete. No variants flagged.",
          { description: targetBatch.label },
        )
      } else {
        setStageIndex(step)
      }
    }, STAGE_INTERVAL_MS)
  }

  const resultBatch = ranBatchId ? BATCHES.find((b) => b.id === ranBatchId) ?? batch : batch
  const counts = hasResult && ranAncestry
    ? resultBatch.variants.reduce(
        (acc, v) => {
          const c = confidenceFor(v, ranAncestry)
          acc[c] += 1
          return acc
        },
        { high: 0, medium: 0, low: 0 },
      )
    : { high: 0, medium: 0, low: 0 }

  function exportCsv() {
    if (!hasResult || !ranAncestry) return
    const rows = [
      ["Gene", "Variant", "Significance score", "Representation confidence", "Manual review"],
      ...resultBatch.variants.map((v) => {
        const c = confidenceFor(v, ranAncestry)
        return [v.gene, v.variant, String(v.sig), c, c === "low" ? "yes" : "no"]
      }),
    ]
    const csv = rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resultBatch.id}-${ranAncestry}-prioritization.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast("Report exported", { description: a.download })
  }

  return (
    <section id="tool" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Run a prioritization
          </h2>
          <p className="mt-2 text-muted-foreground">
            Load a variant batch, choose which reference-ancestry context to check it against,
            then run. Every stage below actually executes against the mock pipeline, in order.
          </p>
        </div>

        <Card className="border-border/70 bg-card/60 backdrop-blur-sm">
          <CardHeader className="grid min-w-0 gap-6 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="batch-select">Variant batch</Label>
              <Select
                value={batchId}
                onValueChange={(v) => v && setBatchId(v)}
                disabled={isRunning}
              >
                <SelectTrigger id="batch-select" className="w-full">
                  <SelectValue className="min-w-0">
                    {() => (
                      <span className="block truncate">
                        {batch.label} &middot; {batch.description}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {BATCHES.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.label} &middot; {b.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Preloaded batches stand in for a real VCF upload in this mockup.
              </p>
            </div>

            <div className="min-w-0 space-y-2">
              <Label>Reference-ancestry context</Label>
              <RadioGroup
                value={ancestry}
                onValueChange={(v) => setAncestry(v as Ancestry)}
                disabled={isRunning}
                className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2"
              >
                <label
                  htmlFor="ancestry-euro"
                  className="flex min-w-0 cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 px-3 py-2.5 text-sm transition-colors has-[[data-state=checked]]:border-primary/50 has-[[data-state=checked]]:bg-primary/10"
                >
                  <RadioGroupItem value="euro" id="ancestry-euro" className="mt-0.5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">European cohort</span>
                    <span className="block truncate text-xs text-muted-foreground">gnomAD / ClinVar baseline</span>
                  </span>
                </label>
                <label
                  htmlFor="ancestry-gulf"
                  className="flex min-w-0 cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 px-3 py-2.5 text-sm transition-colors has-[[data-state=checked]]:border-primary/50 has-[[data-state=checked]]:bg-primary/10"
                >
                  <RadioGroupItem value="gulf" id="ancestry-gulf" className="mt-0.5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">Gulf / Emirati cohort</span>
                    <span className="block truncate text-xs text-muted-foreground">+ UAE Reference Genome layer</span>
                  </span>
                </label>
              </RadioGroup>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={runPrioritization} disabled={!ancestry || isRunning} className="gap-2">
                <FlaskConical className="size-4" />
                {isRunning ? "Running..." : "Run prioritization"}
              </Button>
              <span className="text-xs text-muted-foreground">
                {ancestry ? "Ready. This run uses simulated mock logic only." : "Select a reference-ancestry context to enable this run."}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PipelineStages activeIndex={stageIndex} />
                </motion.div>
              ) : hasResult && ranAncestry ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <Separator />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">
                      {resultBatch.variants.length} variants ranked against the{" "}
                      <span className="font-medium text-foreground">
                        {ranAncestry === "gulf" ? "Gulf / Emirati cohort" : "European reference cohort"}
                      </span>
                      .{" "}
                      {counts.low > 0 ? (
                        <span className="font-medium text-confidence-low">
                          {counts.low} flagged for manual review.
                        </span>
                      ) : (
                        "None flagged for manual review."
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
                      <Download className="size-3.5" />
                      Export report
                    </Button>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
                    <ResultsTable variants={resultBatch.variants} ancestry={ranAncestry} />
                    <div className="rounded-lg border border-border/70 p-4">
                      <div className="mb-2 text-xs font-medium text-muted-foreground">
                        Confidence distribution
                      </div>
                      <ConfidenceChart high={counts.high} medium={counts.medium} low={counts.low} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg border border-dashed border-border/70 px-6 py-10 text-center text-sm text-muted-foreground"
                >
                  No run yet. Choose a reference-ancestry context above, then run prioritization.
                </motion.div>
              )}
            </AnimatePresence>

            {history.length > 0 ? (
              <div className="border-t border-border/70 pt-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <History className="size-3.5" />
                  Run history (this session)
                </div>
                <ul className="space-y-1.5">
                  {history.map((h) => (
                    <li
                      key={h.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground"
                    >
                      <span className="text-foreground">{h.batchLabel}</span>
                      <span>{h.ancestry === "gulf" ? "Gulf / Emirati" : "European"}</span>
                      <span>{h.total} variants</span>
                      <Badge
                        variant="outline"
                        className={
                          h.flagged > 0
                            ? "border-confidence-low/30 bg-confidence-low/10 text-confidence-low"
                            : "border-confidence-high/30 bg-confidence-high/10 text-confidence-high"
                        }
                      >
                        {h.flagged} flagged
                      </Badge>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
