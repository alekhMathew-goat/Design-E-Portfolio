"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map } from "@/components/map"
import Link from "next/link"
import { Clock, AlertTriangle, User, Phone, MapPin, CheckCircle, MessageSquare, AlertCircle } from "lucide-react"
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
              <div className="space-y-5">
                {/* Request Title & Type */}
                <div className="pb-4 border-b border-border">
                  <h2 className="text-2xl font-bold text-text mb-2">{request.title}</h2>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-text">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">Type: {request.type}</span>
                    <span className="px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium">Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                    {/* Priority Badge */}
                    {(() => {
                      const priorityColors: Record<string, { bg: string; text: string }> = {
                        urgent: { bg: "bg-red-100", text: "text-red-700" },
                        high: { bg: "bg-orange-100", text: "text-orange-700" },
                        medium: { bg: "bg-yellow-100", text: "text-yellow-700" },
                        low: { bg: "bg-green-100", text: "text-green-700" },
                      }
                      const colors = priorityColors[request.priority] || priorityColors.medium
                      return (
                        <span className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 ${colors.bg} ${colors.text}`}>
                          <AlertCircle className="w-4 h-4" />
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                        </span>
                      )
                    })()}
                  </div>
                </div>

                {/* Requester Information */}
                <div className="space-y-3">
                  <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Requester Information</div>
                  <div className="grid gap-3 p-4 bg-surface rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-text">Name</div>
                        <div className="text-text font-medium">{request.userName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-text">Contact Phone</div>
                        <div className="text-text font-medium">{request.userPhone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Timing */}
                <div className="space-y-3">
                  <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Timing & Priority</div>
                  <div className="grid grid-cols-2 gap-3 p-4 bg-surface rounded-lg border border-border">
                    <div>
                      <div className="text-xs text-muted-text">Preferred Time</div>
                      <div className="text-text font-medium capitalize flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {request.time}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-text">Posted On</div>
                      <div className="text-text font-medium">{new Date(request.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-border">
                      <div className="text-xs text-muted-text mb-2">Priority Level</div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const priorityColors: Record<string, { bg: string; text: string; description: string }> = {
                            urgent: { bg: "bg-red-100", text: "text-red-700", description: "Urgent - Needed immediately" },
                            high: { bg: "bg-orange-100", text: "text-orange-700", description: "High - Needed today or tomorrow" },
                            medium: { bg: "bg-yellow-100", text: "text-yellow-700", description: "Medium - Needed within 1-2 days" },
                            low: { bg: "bg-green-100", text: "text-green-700", description: "Low - Can wait a few days" },
                          }
                          const colors = priorityColors[request.priority] || priorityColors.medium
                          return (
                            <span className={`px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 ${colors.bg} ${colors.text}`}>
                              <AlertCircle className="w-4 h-4" />
                              {colors.description}
                            </span>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-3">
                <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Additional Information</div>
                <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-border">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-text mb-2">Notes</div>
                    <div className="text-text">{request.description}</div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-3">
                <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Location Details</div>
                <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-border mb-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-text mb-1">Address</div>
                    <div className="text-text font-medium">{request.location.address}</div>
                    <div className="text-xs text-muted-text mt-2">Coordinates: {request.location.lat.toFixed(4)}, {request.location.lng.toFixed(4)}</div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border-2 border-border">
                  <Map
                    center={[request.location.lat, request.location.lng]}
                    markers={[
                      {
                        position: [request.location.lat, request.location.lng],
                        popup: "Request location",
                      },
                    ]}
                    height="350px"
                  />
                </div>
              </div>

              {request.status === "open" && user && user.role === "helper" && (
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <p className="text-sm text-text mb-4">You can help with this request. Accept to contact the requester:</p>
                    <Button
                      onClick={handleAccept}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white text-base h-12 font-semibold"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accept Request
                    </Button>
                  </div>
                  <Button asChild size="lg" variant="outline" className="w-full border-2 text-base h-12 bg-transparent">
                    <Link href="/requests">Back to Requests</Link>
                  </Button>
                </div>
              )}

              {request.status === "open" && (!user || user.role !== "helper") && (
                <div className="space-y-3 border-t border-border pt-6">
                  <Button asChild size="lg" variant="outline" className="w-full border-2 text-base h-12 bg-transparent">
                    <Link href="/requests">Back to Requests</Link>
                  </Button>
                </div>
              )}

              {request.status === "accepted" && (
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="bg-secondary/20 p-4 rounded-lg border-2 border-secondary flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-text font-semibold">Request Accepted</p>
                      <p className="text-sm text-muted-text">Helper is ready to assist</p>
                    </div>
                  </div>
                  {request.acceptedBy && (
                    <div className="p-4 bg-surface rounded-lg border border-border space-y-3">
                      <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Helper Information</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-secondary flex-shrink-0" />
                          <div>
                            <div className="text-xs text-muted-text">Helper Name</div>
                            <div className="text-text font-medium">{request.acceptedBy.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                          <div>
                            <div className="text-xs text-muted-text">Contact Number</div>
                            <div className="text-text font-medium">{request.acceptedBy.phone}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button asChild size="lg" variant="outline" className="w-full border-2 text-base h-12 bg-transparent">
                    <Link href="/requests">Back to Requests</Link>
                  </Button>
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
