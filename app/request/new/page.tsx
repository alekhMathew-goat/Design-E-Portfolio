"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationPicker } from "@/components/location-picker"
import { MessageCircle, Hospital, ShoppingBag, Phone } from "lucide-react"
import { getCurrentUser, saveRequest } from "@/lib/auth"

export default function NewRequestPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [priority, setPriority] = useState("")
  const [notes, setNotes] = useState("")
  const [location, setLocation] = useState<{ address: string; lat: number; lng: number } | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
    setLoading(false)
  }, [router])

  const handleSubmit = () => {
    if (!user || !location || !priority) return

    const requestTypeLabels: Record<string, string> = {
      talk: "Someone to talk to",
      hospital: "Hospital assistance",
      groceries: "Groceries help",
      checkin: "Check-in visit",
    }

    const newRequest = {
      id: `req_${Date.now()}`,
      userId: user.id,
      userName: user.profile.name,
      userPhone: user.profile.phone,
      type: selectedType,
      title: requestTypeLabels[selectedType] || selectedType,
      description: notes || "No additional notes",
      priority: priority as "low" | "medium" | "high" | "urgent",
      location,
      date: new Date().toLocaleDateString(),
      time: preferredTime,
      status: "open" as const,
      createdAt: new Date().toISOString(),
    }

    saveRequest(newRequest)
    router.push("/requests?posted=1")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-text">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const requestTypes = [
    { label: "I would like someone to talk to", value: "talk", icon: MessageCircle },
    { label: "I need help going to a hospital", value: "hospital", icon: Hospital },
    { label: "I need help with groceries", value: "groceries", icon: ShoppingBag },
    { label: "Can someone check in on me?", value: "checkin", icon: Phone },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">What do you need help with today?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Request Type Buttons */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select request type</Label>
                <div className="grid gap-3">
                  {requestTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all flex items-center gap-4 ${
                          selectedType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${selectedType === type.value ? "text-primary" : "text-muted-text"}`}
                        />
                        <span className="text-base font-medium text-text">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <LocationPicker onLocationSelect={setLocation} />

              {/* Priority Level */}
              <div className="space-y-3">
                <Label htmlFor="priority" className="text-base font-medium">
                  Priority level
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority" className="h-12 text-base">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <span className="flex items-center gap-2">Low - Can wait a few days</span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="flex items-center gap-2">Medium - Needed within 1-2 days</span>
                    </SelectItem>
                    <SelectItem value="high">
                      <span className="flex items-center gap-2">High - Needed today or tomorrow</span>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <span className="flex items-center gap-2">Urgent - Needed immediately</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-text">Higher priority requests are displayed first to helpers</p>
              </div>

              {/* Preferred Time */}
              <div className="space-y-3">
                <Label htmlFor="time" className="text-base font-medium">
                  Preferred time
                </Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger id="time" className="h-12 text-base">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Optional Note */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-medium">
                  Optional note
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Example: I prefer a short visit."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={160}
                  className="min-h-24 text-base resize-none"
                />
                <p className="text-sm text-muted-text">{notes.length}/160 characters</p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-14"
                disabled={!selectedType || !preferredTime || !location || !priority}
              >
                Post Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
