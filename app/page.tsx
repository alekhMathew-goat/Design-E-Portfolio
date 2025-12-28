import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MessageCircle, Hospital, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-surface to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 text-balance">
            Connecting grandparents with family and community support
          </h1>
          <p className="text-xl md:text-2xl text-muted-text mb-10 text-pretty">
            Post simple requests and get help with check-ins, errands, or hospital visits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 text-lg h-14 px-8 bg-transparent"
            >
              <Link href="/requests">Browse Requests</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Quick Steps - guide for new users */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-text mb-4">How it works — 3 simple steps</h2>
          <p className="text-sm text-muted-text mb-6">Get help quickly by following these easy steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-border rounded-lg">
              <div className="text-xl font-bold text-primary mb-2">1. Post a request</div>
              <div className="text-sm text-muted-text">Choose a request type, add your location and priority, then post.</div>
            </div>

            <div className="p-4 border-2 border-border rounded-lg">
              <div className="text-xl font-bold text-primary mb-2">2. Helpers browse</div>
              <div className="text-sm text-muted-text">Helpers see requests nearby and can view details on the map.</div>
            </div>

            <div className="p-4 border-2 border-border rounded-lg">
              <div className="text-xl font-bold text-primary mb-2">3. Connect safely</div>
              <div className="text-sm text-muted-text">Accept a match, then contact the requester to coordinate help.</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">Post simple requests</h3>
                <p className="text-muted-text leading-relaxed">Large buttons, clear options, no complicated forms.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">Accept and respond</h3>
                <p className="text-muted-text leading-relaxed">Helpers can accept requests and see contact details.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hospital className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">Safety-first</h3>
                <p className="text-muted-text leading-relaxed">Clear guidance and emergency reminders throughout.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-accent/50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-text font-medium">
            This is a conceptual demo. In an emergency, contact local emergency services immediately.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
