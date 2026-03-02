// LoginForm.tsx ============
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { FormField } from "../Molecules/FormField"
import { ErrorMessage } from "../Atoms/ErrorMessage"
import { login } from "@/lib/auth"

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const result = login(email, password)

        if (result.success) {
            router.push("/onboarding")
        } else {
            setError(result.error || "Login failed")
        }

        setLoading(false)
    }

    return (
        <Card className="border-2 border-border">
            <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <ErrorMessage message={error} />

                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        required
                    />

                    <FormField
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#dd673c]  h-14 hover:bg-[#dd673c]/20 text-white hover:text-black"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}