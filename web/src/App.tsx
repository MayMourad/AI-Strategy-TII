import { Toaster } from "@/components/ui/sonner"
import { ExpandableNav } from "@/components/nav"
import { Hero } from "@/components/sections/hero"
import { ToolSection } from "@/components/sections/tool-section"
import { EvidenceSection } from "@/components/sections/evidence-section"
import { AboutSection } from "@/components/sections/about-section"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExpandableNav />
      <main>
        <Hero />
        <ToolSection />
        <EvidenceSection />
        <AboutSection />
      </main>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  )
}

export default App
