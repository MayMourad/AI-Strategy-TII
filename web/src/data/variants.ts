export type Confidence = "high" | "medium" | "low"
export type Ancestry = "euro" | "gulf"
export type CoverageProfile = "well" | "moderate" | "poor"

export interface Variant {
  gene: string
  variant: string
  consequence: string
  sig: number
  coverage: CoverageProfile
  confEuro: Confidence
  confGulf: Confidence
  gnomadTotal: number
  gnomadMiddleEastern: number
  clinvarSubmissions: number
  nearestRegionalReference: string
}

export interface Batch {
  id: string
  label: string
  description: string
  variants: Variant[]
}

function refNote(coverage: CoverageProfile): string {
  if (coverage === "well") {
    return "UAE Reference Genome (2021): matched, high-depth coverage"
  }
  if (coverage === "moderate") {
    return "Middle East Variation DB: partial coverage, low sample depth"
  }
  return "No regional reference panel covers this locus"
}

function gnomadCounts(coverage: CoverageProfile): { total: number; me: number } {
  if (coverage === "well") return { total: 412, me: 38 }
  if (coverage === "moderate") return { total: 96, me: 4 }
  return { total: 21, me: 0 }
}

function makeVariant(
  gene: string,
  variant: string,
  consequence: string,
  sig: number,
  coverage: CoverageProfile,
  confEuro: Confidence,
  confGulf: Confidence,
  clinvarSubmissions: number,
): Variant {
  const { total, me } = gnomadCounts(coverage)
  return {
    gene,
    variant,
    consequence,
    sig,
    coverage,
    confEuro,
    confGulf,
    gnomadTotal: total,
    gnomadMiddleEastern: me,
    clinvarSubmissions,
    nearestRegionalReference: refNote(coverage),
  }
}

export const BATCHES: Batch[] = [
  {
    id: "cardio",
    label: "Cardiomyopathy panel",
    description: "Pilot cohort A, 12 variants",
    variants: [
      makeVariant("MYBPC3", "c.2827C>T", "missense", 88, "well", "high", "high", 14),
      makeVariant("MYH7", "c.1988G>A", "missense", 91, "well", "high", "high", 22),
      makeVariant("TNNT2", "c.517G>A", "missense", 76, "moderate", "high", "medium", 6),
      makeVariant("TTN", "c.43628-2A>G", "splice acceptor", 64, "poor", "medium", "low", 2),
      makeVariant("PKP2", "c.1643del", "frameshift", 82, "moderate", "high", "medium", 5),
      makeVariant("DSP", "c.273del", "frameshift", 55, "poor", "high", "low", 1),
      makeVariant("LMNA", "c.673C>T", "missense", 70, "well", "high", "high", 9),
      makeVariant("RBM20", "c.1907G>A", "missense", 48, "poor", "high", "low", 1),
      makeVariant("TPM1", "c.574G>A", "missense", 61, "moderate", "high", "medium", 3),
      makeVariant("MYL2", "c.64G>A", "missense", 45, "poor", "high", "low", 1),
      makeVariant("ACTC1", "c.301G>A", "missense", 58, "poor", "high", "low", 2),
      makeVariant("PLN", "c.40_42delAGA", "in-frame deletion", 73, "moderate", "high", "medium", 4),
    ],
  },
  {
    id: "cancer",
    label: "Hereditary cancer panel",
    description: "Pilot cohort B, 10 variants",
    variants: [
      makeVariant("BRCA1", "c.5266dupC", "frameshift", 93, "well", "high", "high", 31),
      makeVariant("BRCA2", "c.5946delT", "frameshift", 89, "well", "high", "high", 27),
      makeVariant("MLH1", "c.1852_1855del", "frameshift", 85, "moderate", "high", "medium", 8),
      makeVariant("MSH2", "c.942+3A>T", "splice donor", 67, "poor", "high", "low", 2),
      makeVariant("MSH6", "c.3226C>T", "nonsense", 52, "poor", "medium", "low", 1),
      makeVariant("PMS2", "c.736_737del", "frameshift", 78, "moderate", "high", "medium", 4),
      makeVariant("TP53", "c.524G>A", "missense", 90, "well", "high", "high", 19),
      makeVariant("PALB2", "c.172_175del", "frameshift", 62, "poor", "high", "low", 2),
      makeVariant("ATM", "c.7271T>G", "missense", 58, "poor", "high", "low", 1),
      makeVariant("CHEK2", "c.1100delC", "frameshift", 71, "moderate", "high", "medium", 6),
    ],
  },
  {
    id: "metabolic",
    label: "Metabolic disorder panel",
    description: "Pilot cohort C, 8 variants",
    variants: [
      makeVariant("LDLR", "c.681C>G", "missense", 84, "well", "high", "high", 12),
      makeVariant("PCSK9", "c.1420C>T", "missense", 67, "moderate", "high", "medium", 5),
      makeVariant("APOB", "c.10580G>A", "missense", 59, "poor", "high", "low", 2),
      makeVariant("GAA", "c.-32-13T>G", "splice region", 71, "well", "high", "high", 8),
      makeVariant("PAH", "c.1222C>T", "missense", 63, "poor", "medium", "low", 1),
      makeVariant("G6PD", "c.563C>T", "missense", 48, "poor", "high", "low", 1),
      makeVariant("HEXA", "c.1274_1277dupTATC", "frameshift", 88, "moderate", "high", "medium", 7),
      makeVariant("ABCA1", "c.6370C>T", "missense", 54, "poor", "high", "low", 2),
    ],
  },
]

export function sigLabel(score: number): "High" | "Medium" | "Low" {
  if (score >= 75) return "High"
  if (score >= 50) return "Medium"
  return "Low"
}

export function confidenceFor(variant: Variant, ancestry: Ancestry): Confidence {
  return ancestry === "gulf" ? variant.confGulf : variant.confEuro
}
