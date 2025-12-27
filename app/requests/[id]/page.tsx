"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map } from "@/components/map"
import Link from "next/link"
import { Clock, AlertTriangle, User, Phone } from "lucide-react"
import { getRequestById, updateRequest, getCurrentUser } from "@/lib/auth"

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [request, setRequest] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    const requestData = getRequestById(params.id)

    if (!requestData) {
      router.push("/requests")
      return
    }

    setUser(currentUser)
    setRequest(requestData)
    setLoading(false)
  }, [params.id, router])

  const handleAccept = () => {
    if (!user || !request) return

    updateRequest(request.id, {
      status: "accepted",
      acceptedBy: {
        id: user.id,
        name: user.profile.name,
        phone: user.profile.phone,
      },
    })

    router.push(`/confirmation?requestId=${request.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-text">Loading...</p>
      </div>
    )
  }

  if (!request) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-muted-text font-medium min-w-32">Request:</div>
                  <div className="text-text font-medium">{request.title}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-text">Preferred time</div>
                    <div className="text-text font-medium capitalize">{request.time}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-text">Posted by</div>
                    <div className="text-text font-medium">{request.userName}</div>
                  </div>
                </div>
              </div>

              {request.description && request.description !== "No additional notes" && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-text font-medium">Additional notes</div>
                  <div className="text-text p-4 bg-surface rounded-lg">{request.description}</div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-sm text-muted-text font-medium">Location</div>
                <div className="text-text font-medium mb-3">{request.location.address}</div>
                <div className="rounded-lg overflow-hidden border-2 border-border">
                  <Map
                    center={[request.location.lat, request.location.lng]}
                    markers={[
                      {
                        position: [request.location.lat, request.location.lng],
                        popup: "Request location",
                      },
                    ]}
                    height="300px"
                  />
                </div>
              </div>

              {request.status === "open" && user && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white text-base h-12"
                  >
                    Accept Request
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1 border-2 text-base h-12 bg-transparent">
                    <Link href="/requests">Back to Requests</Link>
                  </Button>
                </div>
              )}

              {request.status === "accepted" && (
                <div className="bg-secondary/20 p-4 rounded-lg border-2 border-secondary">
                  <p className="text-text font-medium text-center">This request has been accepted</p>
                  {request.acceptedBy && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-text">Accepted by:</span>
                        <span className="text-sm text-text font-medium">{request.acceptedBy.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-text">Contact:</span>
                        <span className="text-sm text-text font-medium">{request.acceptedBy.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!user && (
                <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                  <p className="text-sm text-text text-center mb-3">Sign in to accept requests</p>
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safety Callout */}
          <Card className="border-2 border-warning/30 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-text mb-2">Safety reminder</h3>
                  <p className="text-sm text-muted-text leading-relaxed">
                    Only accept tasks you can safely complete. If urgent medical help is needed, contact emergency
                    services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
