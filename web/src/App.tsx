import { Toaster } from "@/components/ui/sonner"
import { ExpandableNav } from "@/components/nav"
import { Hero } from "@/components/sections/hero"
import { OrganizationSection } from "@/components/sections/organization-section"
import { SystemSection } from "@/components/sections/system-section"
import { ToolSection } from "@/components/sections/tool-section"
import { EvaluationSection } from "@/components/sections/evaluation-section"
import { AboutSection } from "@/components/sections/about-section"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExpandableNav />
      <main>
        <Hero />
        <OrganizationSection />
        <SystemSection />
        <ToolSection />
        <EvaluationSection />
        <AboutSection />
      </main>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  )
}

export default App
