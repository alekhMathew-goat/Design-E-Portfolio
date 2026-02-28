"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signup } from "@/lib/auth"
import Link from "next/link"
import { UserPlus, AlertCircle } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"grandparent" | "helper">("grandparent")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const result = signup(email, password, role, {
      name,
      age: age ? Number.parseInt(age) : undefined,
      phone,
      preferredContact: "Phone call",
    })

    if (result.success) {
      router.push("/onboarding")
    } else {
      setError(result.error || "Signup failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-2 border-border">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">Create Account</CardTitle>
              <CardDescription className="text-base">Join the Neighborly Care community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-base">
                    I am a
                  </Label>
                  <Select value={role} onValueChange={(value: "grandparent" | "helper") => setRole(value)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="helper">Helper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {role === "grandparent" && (
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-base">
                      Age (optional)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                      placeholder="68"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 border border-gray-400 !hover:border-gray-400 !focus:border-gray-400 !focus:ring-0 !focus:ring-offset-0 !outline-none !focus:outline-none !shadow-none !focus:shadow-none placeholder:text-gray-400 appearance-none none"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white text-lg h-14"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                <div className="text-center">
                  <p className="text-muted-text">
                    Already have an account?{" "}
                    <Link href="/login" className="!text-[#50966d] hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
