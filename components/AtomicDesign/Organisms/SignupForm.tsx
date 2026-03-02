"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

import { FormField } from "../Molecules/FormField"
import { RoleSelect } from "../Molecules/RoleSelect"
import { ErrorMessage } from "../Atoms/ErrorMessage"

export const SignupForm = () => {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState<"grandparent" | "helper">("grandparent")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            return setError("Passwords do not match")
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters")
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
        <Card className="border-2 border-border">
            <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join the Neighborly Care community</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <ErrorMessage message={error} />

                    <RoleSelect role={role} setRole={setRole} />

                    <FormField
                        label="Full Name"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        required
                    />

                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        required
                    />

                    <FormField
                        label="Phone Number"
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e: any) => setPhone(e.target.value)}
                        required
                    />

                    {role === "grandparent" && (
                        <FormField
                            label="Age (optional)"
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e: any) => setAge(e.target.value)}
                        />
                    )}

                    <FormField
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        required
                    />

                    <FormField
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#dd673c]  hover:bg-[#dd673c]/20 text-white hover:text-black"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}