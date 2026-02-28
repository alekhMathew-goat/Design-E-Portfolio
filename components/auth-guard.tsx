"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export function AuthGuard({
  children,
  requireRole,
}: { children: React.ReactNode; requireRole?: "grandparent" | "helper" }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()

    if (!user) {
      router.push("/login")
      return
    }

    if (requireRole && user.role !== requireRole) {
      router.push("/onboarding")
      return
    }

    setIsAuthorized(true)
  }, [router, requireRole])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-text">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
