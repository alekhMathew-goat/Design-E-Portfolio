"use client"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Phone, MapPin, Star, CheckCircle } from "lucide-react"
import { Header } from "@/components/AtomicDesign/Organisms/Header"

export default function HelperDemoPage() {
  const demoHelper = {
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    bio: "Passionate about helping seniors with tech and daily tasks",
    specialties: "Technology Support, Grocery Shopping, House Cleaning",
    experience: "3",
    location: "Brooklyn, NY",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl">Helper Profile (Demo)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Name</p>
                  <p className="text-lg font-medium text-text">{demoHelper.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Phone</p>
                  <p className="text-lg font-medium text-text">{demoHelper.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-lg">
                <User className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-text">Bio</p>
                  <p className="text-lg font-medium text-text">{demoHelper.bio}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-lg">
                <Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-text">Specialties</p>
                  <p className="text-lg font-medium text-text">{demoHelper.specialties}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Years of Experience</p>
                  <p className="text-lg font-medium text-text">{demoHelper.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-text">Location</p>
                  <p className="text-lg font-medium text-text">{demoHelper.location}</p>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-14">
                <Link href="/requests">View Available Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
