// grandparent==================
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, updateUser } from "@/lib/auth"
import { GrandparentProfileCard } from "@/components/AtomicDesign/Organisms/GrandparentProfileCard"
import { AuthTemplate } from "@/components/AtomicDesign/Templates/AuthTemplate"

export default function GrandparentProfilePage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) router.push("/login")
    else setUser(currentUser)
  }, [router])

  const handleUpdate = (data: any) => {
    if (user) {
      updateUser(user.id, { profile: { ...user.profile, ...data } })
      setUser(getCurrentUser())
    }
  }

  if (!user) return <p className="text-center py-16 text-muted-text">Loading...</p>

  return (
    <AuthTemplate>
      <GrandparentProfileCard user={user} onUpdate={handleUpdate} />
    </AuthTemplate>
  )
}