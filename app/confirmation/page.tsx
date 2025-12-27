"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, User, Phone, MapPin, Clock } from "lucide-react"
import { getRequestById } from "@/lib/auth"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const requestId = searchParams.get("requestId")
  const [request, setRequest] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (!requestId) {
      router.push("/requests")
      return
    }

    const requestData = getRequestById(requestId)
    if (!requestData) {
      router.push("/requests")
      return
    }

    setRequest(requestData)
  }, [requestId, router])

  if (!request) {
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
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-secondary">
            <CardContent className="pt-12 pb-12 text-center space-y-8">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-secondary" />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">Request accepted</h1>
                <p className="text-lg text-muted-text">
                  You're now connected. Use the contact information below to arrange support.
                </p>
              </div>

              {/* Request Details Card */}
              <Card className="border-2 border-border text-left">
                <CardContent className="pt-6 space-y-4">
                  <div className="pb-3 border-b border-border">
                    <p className="text-sm text-muted-text mb-1">Request Type</p>
                    <p className="text-lg font-semibold text-text">{request.title}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-text">Name</p>
                      <p className="text-lg font-medium text-text">{request.userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-text">Phone</p>
                      <p className="text-lg font-medium text-text">{request.userPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-text">Preferred Time</p>
                      <p className="text-lg font-medium text-text capitalize">{request.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-text">Location</p>
                      <p className="text-base font-medium text-text">{request.location.address}</p>
                    </div>
                  </div>

                  {request.description && request.description !== "No additional notes" && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-text mb-2">Additional Notes</p>
                      <p className="text-base text-text">{request.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/30">
                <p className="text-sm text-text font-medium">
                  Please contact {request.userName} via phone to confirm the details and arrange the visit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  <Link href="/requests">Back to Requests</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 border-2 bg-transparent">
                  <Link href="/help">Help & Safety</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
