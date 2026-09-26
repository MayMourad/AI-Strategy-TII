import { AnimatePresence, motion } from "motion/react"
import { Building2, FlaskConical, Info, LayoutDashboard, ScaleIcon, Workflow } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "system", label: "System", icon: Workflow },
  { id: "tool", label: "Run diagnostic", icon: FlaskConical },
  { id: "evaluation", label: "Evaluation", icon: ScaleIcon },
  { id: "about", label: "About", icon: Info },
] as const

export function ExpandableNav() {
  const [active, setActive] = useState<string>("overview")
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    )
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
      aria-label="Section navigation"
    >
      <ul
        className="flex items-center gap-1 rounded-full border border-border/80 bg-card/70 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
        onMouseLeave={() => setHovered(null)}
      >
        {SECTIONS.map((section) => {
          const Icon = section.icon
          const isActive = active === section.id
          const isExpanded = hovered === section.id || isActive
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                onMouseEnter={() => setHovered(section.id)}
                onFocus={() => setHovered(section.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={section.label}
                className={cn(
                  "relative flex h-9 items-center gap-2 overflow-hidden rounded-full px-3 text-sm font-medium transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                ) : null}
                <Icon className="relative z-10 size-4 shrink-0" />
                <AnimatePresence initial={false}>
                  {isExpanded ? (
                    <motion.span
                      key="label"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {section.label}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
