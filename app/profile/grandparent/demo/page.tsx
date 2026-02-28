import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Phone, AlertCircle } from "lucide-react"

export default function GrandparentProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Name</p>
                  <p className="text-lg font-medium text-text">Amina K.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Age</p>
                  <p className="text-lg font-medium text-text">68</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Preferred contact</p>
                  <p className="text-lg font-medium text-text">Phone call</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <AlertCircle className="w-6 h-6 text-warning" />
                <div>
                  <p className="text-sm text-muted-text">Emergency contact</p>
                  <p className="text-lg font-medium text-text">Daughter — +000 000 0000</p>
                </div>
              </div>

              <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                <p className="text-sm text-text text-center">Demo data only. No accounts or data storage.</p>
              </div>

              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-14">
                <Link href="/request/new">Post a Request</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
