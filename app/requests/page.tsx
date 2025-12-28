"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map } from "@/components/map"
import Link from "next/link"
import { MessageCircle, Hospital, ShoppingBag, Phone, CheckCircle, MapPin, AlertCircle } from "lucide-react"
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
    
    // Sort by priority (urgent > high > medium > low)
    const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 }
    const sortedRequests = openRequests.sort((a, b) => {
      const priorityA = priorityOrder[a.priority] ?? 4
      const priorityB = priorityOrder[b.priority] ?? 4
      return priorityA - priorityB
    })
    
    setRequests(sortedRequests)
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
                const typeLabel = request.type === "talk" ? "Someone to talk to" : request.type === "hospital" ? "Hospital assistance" : request.type === "groceries" ? "Groceries help" : "Check-in visit"
                
                // Priority styling
                const priorityConfig: Record<string, { bg: string; text: string; label: string; icon: any }> = {
                  urgent: { bg: "bg-red-50 border-red-300", text: "text-red-700", label: "Urgent", icon: AlertCircle },
                  high: { bg: "bg-orange-50 border-orange-300", text: "text-orange-700", label: "High", icon: AlertCircle },
                  medium: { bg: "bg-yellow-50 border-yellow-300", text: "text-yellow-700", label: "Medium", icon: AlertCircle },
                  low: { bg: "bg-green-50 border-green-300", text: "text-green-700", label: "Low", icon: AlertCircle },
                }
                const config = priorityConfig[request.priority] || priorityConfig.medium
                const PriorityIcon = config.icon
                
                return (
                  <Card key={request.id} className={`border-2 hover:border-primary transition-colors overflow-hidden ${config.bg}`}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Left: Icon and Title */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-text mb-2">{request.title}</h3>
                              <p className="text-sm text-muted-text mb-3">{typeLabel}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded">Status: Open</span>
                                <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">Time: {request.time}</span>
                                <span className={`px-2.5 py-1 ${config.bg} ${config.text} text-xs font-bold rounded flex items-center gap-1 border`}>
                                  <PriorityIcon className="w-3 h-3" />
                                  {config.label} Priority
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-text flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {request.location.address}
                          </div>
                        </div>

                        {/* Right: Action */}
                        <div className="flex flex-col justify-between">
                          <div className="text-sm text-muted-text text-right">
                            <div className="font-semibold text-text mb-1">{request.userName}</div>
                            <div className="text-xs">{new Date(request.createdAt).toLocaleDateString()}</div>
                          </div>
                          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white w-full">
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
