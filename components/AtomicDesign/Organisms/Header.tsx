"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import { Logo } from "../Atoms/Logo"
import { DesktopNav } from "../Molecules/DesktopNav"
import { UserDropdown } from "../Molecules/UserDropdown"
export const Header = () => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    return (
        <header className="mx-8 border-b border-border bg-background sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-2">
                <Logo />
                <DesktopNav user={user} />
                <UserDropdown user={user} setUser={setUser} />
            </div>
        </header>
    )
}