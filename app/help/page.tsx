import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Shield, Info } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center">Help & Safety</h1>

          <div className="space-y-6">
            <Card className="border-2 border-warning/30 bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-3">Emergency guidance</h2>
                    <p className="text-muted-text leading-relaxed">
                      If someone is in immediate danger or needs urgent medical care, call <strong>112</strong> or contact local emergency services
                      right away.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-3">Respect and privacy</h2>
                    <p className="text-muted-text leading-relaxed">
                      Keep communication respectful. Avoid sharing sensitive personal information in notes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Info className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-3">Scope of this demo</h2>
                    <p className="text-muted-text leading-relaxed">
                      This is a prototype model for a school project. It does not process or store real data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
