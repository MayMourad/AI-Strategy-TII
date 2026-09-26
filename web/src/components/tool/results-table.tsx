import { ChevronDown } from "lucide-react"
import { Fragment, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type Ancestry, confidenceFor, sigLabel, type Variant } from "@/data/variants"

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-confidence-high/12 text-confidence-high border-confidence-high/25",
  medium: "bg-confidence-medium/12 text-confidence-medium border-confidence-medium/25",
  low: "bg-confidence-low/12 text-confidence-low border-confidence-low/25",
}

const CONFIDENCE_TEXT: Record<string, string> = { high: "High", medium: "Medium", low: "Low" }

export function ResultsTable({ variants, ancestry }: { variants: Variant[]; ancestry: Ancestry }) {
  const [openRow, setOpenRow] = useState<string | null>(null)

  return (
    <div className="overflow-x-auto rounded-lg border border-border/70">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-8" />
            <TableHead>Variant / gene</TableHead>
            <TableHead>Clinical significance</TableHead>
            <TableHead>Representation confidence</TableHead>
            <TableHead>Review status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((v, i) => {
            const confidence = confidenceFor(v, ancestry)
            const flagged = confidence === "low"
            const isOpen = openRow === v.variant
            return (
              <Fragment key={v.variant}>
                <TableRow
                  key={v.variant}
                  className="cursor-pointer animate-in fade-in slide-in-from-bottom-1 duration-300"
                  style={{ animationDelay: `${i * 35}ms`, animationFillMode: "backwards" }}
                  onClick={() => setOpenRow(isOpen ? null : v.variant)}
                >
                  <TableCell>
                    <ChevronDown
                      className={cn("size-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{v.gene}</div>
                    <div className="font-mono text-xs text-muted-foreground">{v.variant}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium tabular-nums">{v.sig}</span>
                      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                        <span className="block h-full rounded-full bg-chart-4" style={{ width: `${v.sig}%` }} />
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{sigLabel(v.sig)} significance</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border font-medium", CONFIDENCE_STYLES[confidence])}>
                      {CONFIDENCE_TEXT[confidence]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {flagged ? (
                      <Badge variant="outline" className="border-confidence-low/30 bg-confidence-low/10 text-confidence-low">
                        Manual review recommended
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">No flag</span>
                    )}
                  </TableCell>
                </TableRow>
                {isOpen ? (
                  <TableRow key={`${v.variant}-detail`} className="hover:bg-transparent">
                    <TableCell colSpan={5} className="bg-muted/40 p-0">
                      <div className="grid animate-in fade-in slide-in-from-top-1 gap-x-8 gap-y-2 px-5 py-4 text-xs duration-200 sm:grid-cols-3">
                        <div>
                          <div className="text-muted-foreground">Consequence</div>
                          <div className="mt-0.5 font-medium text-foreground capitalize">{v.consequence}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">gnomAD allele count</div>
                          <div className="mt-0.5 font-medium text-foreground">
                            {v.gnomadTotal} total <span className="text-muted-foreground">/</span> {v.gnomadMiddleEastern} Middle Eastern
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">ClinVar submissions</div>
                          <div className="mt-0.5 font-medium text-foreground">{v.clinvarSubmissions}</div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="text-muted-foreground">Nearest regional reference</div>
                          <div className="mt-0.5 font-medium text-foreground">{v.nearestRegionalReference}</div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null}
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
