"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import { LogOut, Menu, X } from "lucide-react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-text hover:text-primary transition-colors">
          Gran-assist
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-base text-muted-text hover:text-text transition-colors">
            Home
          </Link>
          {user && (
            <>
              <Link href="/request/new" className="text-base text-muted-text hover:text-text transition-colors">
                Post Request
              </Link>
              <Link href="/requests" className="text-base text-muted-text hover:text-text transition-colors">
                Requests
              </Link>
              <Link
                href={user.role === "grandparent" ? "/profile/grandparent" : "/profile/helper"}
                className="text-base text-muted-text hover:text-text transition-colors"
              >
                Profile
              </Link>
            </>
          )}
          <Link href="/help" className="text-base text-muted-text hover:text-text transition-colors">
            Help & Safety
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-text">Hello, {user.profile.name}</span>
              <Button
                onClick={handleLogout}
                size="lg"
                variant="outline"
                className="border-2 bg-transparent flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-base text-muted-text hover:text-text transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/request/new"
                  className="text-base text-muted-text hover:text-text transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post Request
                </Link>
                <Link
                  href="/requests"
                  className="text-base text-muted-text hover:text-text transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Requests
                </Link>
                <Link
                  href={user.role === "grandparent" ? "/profile/grandparent" : "/profile/helper"}
                  className="text-base text-muted-text hover:text-text transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
            <Link
              href="/help"
              className="text-base text-muted-text hover:text-text transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help & Safety
            </Link>

            {user ? (
              <>
                <div className="text-sm text-muted-text pt-2 border-t border-border">Hello, {user.profile.name}</div>
                <Button onClick={handleLogout} size="lg" variant="outline" className="border-2 bg-transparent w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 bg-transparent w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
