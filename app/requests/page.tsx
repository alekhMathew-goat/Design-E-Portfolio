"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map } from "@/components/map"
import Link from "next/link"
import { MessageCircle, Hospital, ShoppingBag, Phone, CheckCircle } from "lucide-react"
import { getRequests } from "@/lib/auth"

const iconMap: Record<string, any> = {
  talk: MessageCircle,
  hospital: Hospital,
  groceries: ShoppingBag,
  checkin: Phone,
}

export default function RequestsPage() {
  const searchParams = useSearchParams()
  const posted = searchParams.get("posted")
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const allRequests = getRequests()
    const openRequests = allRequests.filter((req) => req.status === "open")
    setRequests(openRequests)
  }, [])

  const markers = requests.map((req) => ({
    position: [req.location.lat, req.location.lng] as [number, number],
    popup: req.title,
  }))

  const centerLat = requests.length > 0 ? requests[0].location.lat : 40.7128
  const centerLng = requests.length > 0 ? requests[0].location.lng : -74.006

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posted && (
            <div className="mb-8 p-4 bg-secondary/20 border-2 border-secondary rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
              <p className="text-text font-medium">Your request has been posted successfully!</p>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-text mb-8">Nearby Requests</h1>

          {requests.length > 0 && (
            <div className="mb-8 rounded-lg overflow-hidden border-2 border-border">
              <Map center={[centerLat, centerLng]} zoom={14} markers={markers} height="400px" />
            </div>
          )}

          {requests.length === 0 ? (
            <Card className="border-2 border-border">
              <CardContent className="py-16 text-center">
                <p className="text-xl text-muted-text mb-4">No open requests at the moment.</p>
                <p className="text-base text-muted-text">Check back later or post your own request!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {requests.map((request) => {
                const Icon = iconMap[request.type] || MessageCircle
                return (
                  <Card key={request.id} className="border-2 border-border hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-text mb-2">{request.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-text mb-4">
                            <span>{request.location.address}</span>
                            <span>•</span>
                            <span>{request.time}</span>
                          </div>
                          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                            <Link href={`/requests/${request.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
