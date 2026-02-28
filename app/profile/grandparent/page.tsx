"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { User, Phone, AlertCircle, MapPin } from "lucide-react"
import { getCurrentUser, updateUser } from "@/lib/auth"

export default function GrandparentProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [phone, setPhone] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
      setName(currentUser.profile.name)
      setAge(currentUser.profile.age?.toString() || "")
      setPhone(currentUser.profile.phone)
      setEmergencyContact(currentUser.profile.emergencyContact || "")
    }
  }, [router])

  const handleSave = () => {
    if (user) {
      updateUser(user.id, {
        profile: {
          ...user.profile,
          name,
          age: age ? Number.parseInt(age) : undefined,
          phone,
          emergencyContact,
        },
      })
      setUser(getCurrentUser())
      setIsEditing(false)
    }
  }

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
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl">Your Profile</CardTitle>
              <Button variant="outline" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-base">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency" className="text-base">
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergency"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="h-12 text-base"
                      placeholder="Daughter — +000 000 0000"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                    <User className="w-6 h-6 text-[#50966d]" />
                    <div>
                      <p className="text-sm text-muted-text">Name</p>
                      <p className="text-lg font-medium text-text">{user.profile.name}</p>
                    </div>
                  </div>

                  {user.profile.age && (
                    <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <User className="w-6 h-6 text-[#50966d]" />
                      <div>
                        <p className="text-sm text-muted-text">Age</p>
                        <p className="text-lg font-medium text-text">{user.profile.age}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                    <Phone className="w-6 h-6 text-[#50966d]" />
                    <div>
                      <p className="text-sm text-muted-text">Phone</p>
                      <p className="text-lg font-medium text-text">{user.profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                    <Phone className="w-6 h-6 text-[#50966d]" />
                    <div>
                      <p className="text-sm text-muted-text">Preferred contact</p>
                      <p className="text-lg font-medium text-text">{user.profile.preferredContact}</p>
                    </div>
                  </div>

                  {user.profile.emergencyContact && (
                    <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-warning" />
                      <div>
                        <p className="text-sm text-muted-text">Emergency contact</p>
                        <p className="text-lg font-medium text-text">{user.profile.emergencyContact}</p>
                      </div>
                    </div>
                  )}

                  {user.profile.location && (
                    <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm text-muted-text">Location</p>
                        <p className="text-lg font-medium text-text">{user.profile.location.address}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-3 pt-4 border-t border-border">
                <Button asChild size="lg" className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white text-lg h-14">
                  <Link href="/request/new">Post a Request</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full border-2 text-lg h-14">
                  <Link href="/requests">Browse Available Helpers</Link>
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
