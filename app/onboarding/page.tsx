"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { UserRound, HandHeart } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function OnboardingPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-text">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Welcome, {user.profile.name}!</h1>
            <p className="text-lg text-muted-text">Choose how you'd like to use Neighborly Care</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/profile/grandparent" className="group">
              <Card className="border-2 border-border hover:border-primary transition-all h-full cursor-pointer hover:shadow-lg">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <UserRound className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-text mb-4">Grandparent</h2>
                  <p className="text-lg text-muted-text leading-relaxed">Create a simple profile and post requests.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/requests" className="group">
              <Card className="border-2 border-border hover:border-secondary transition-all h-full cursor-pointer hover:shadow-lg">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/30 transition-colors">
                    <HandHeart className="w-10 h-10 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-text mb-4">Helper</h2>
                  <p className="text-lg text-muted-text leading-relaxed">Browse nearby requests and offer support.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
