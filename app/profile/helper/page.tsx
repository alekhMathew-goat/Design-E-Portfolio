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
import { User, Phone, MapPin, Star, CheckCircle } from "lucide-react"
import { getCurrentUser, updateUser } from "@/lib/auth"

export default function HelperProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [specialties, setSpecialties] = useState("")
  const [experience, setExperience] = useState("")
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
      setName(currentUser.profile.name)
      setPhone(currentUser.profile.phone)
      setBio(currentUser.profile.bio || "")
      setSpecialties(currentUser.profile.specialties || "")
      setExperience((currentUser.profile.experience || "").toString())
    }
  }, [router])

  const handleSave = () => {
    if (user) {
      updateUser(user.id, {
        profile: {
          ...user.profile,
          name,
          phone,
          bio,
          specialties,
          experience,
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
              <CardTitle className="text-2xl md:text-3xl">Helper Profile</CardTitle>
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
                    <Label htmlFor="bio" className="text-base">
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="h-12 text-base"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialties" className="text-base">
                      Specialties
                    </Label>
                    <Input
                      id="specialties"
                      value={specialties}
                      onChange={(e) => setSpecialties(e.target.value)}
                      className="h-12 text-base"
                      placeholder="e.g., Gardening, Cooking, Tech Support"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-base">
                      Years of Experience
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="h-12 text-base"
                      placeholder="e.g., 5"
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

                  <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                    <Phone className="w-6 h-6 text-[#50966d]" />
                    <div>
                      <p className="text-sm text-muted-text">Phone</p>
                      <p className="text-lg font-medium text-text">{user.profile.phone}</p>
                    </div>
                  </div>

                  {user.profile.bio && (
                    <div className="flex items-start gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <User className="w-6 h-6 text-[#50966d] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-text">Bio</p>
                        <p className="text-lg font-medium text-text">{user.profile.bio}</p>
                      </div>
                    </div>
                  )}

                  {user.profile.specialties && (
                    <div className="flex items-start gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <Star className="w-6 h-6 text-[#50966d] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-text">Specialties</p>
                        <p className="text-lg font-medium text-text">{user.profile.specialties}</p>
                      </div>
                    </div>
                  )}

                  {user.profile.experience && (
                    <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-[#50966d]" />
                      <div>
                        <p className="text-sm text-muted-text">Years of Experience</p>
                        <p className="text-lg font-medium text-text">{user.profile.experience}</p>
                      </div>
                    </div>
                  )}

                  {user.profile.location && (
                    <div className="flex items-center gap-4 p-4 bg-[#50966d]/5 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#50966d]" />
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
                  <Link href="/requests">View Available Requests</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full border-2 text-lg h-14">
                  <Link href="/help">Get Help & Safety Tips</Link>
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
