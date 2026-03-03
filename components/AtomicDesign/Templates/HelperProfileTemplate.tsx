"use client"

import { Header } from "@/components/AtomicDesign/Organisms/Header"
import { Footer } from "@/components/footer"
import { HelperProfileCard } from "../Organisms/HelperProfileCard"

interface Props {
    user: any
    setUser: (user: any) => void
}

export const HelperProfileTemplate = ({ user, setUser }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-16 px-4">
                <div className="container mx-auto max-w-2xl">
                    <HelperProfileCard user={user} setUser={setUser} />
                </div>
            </main>

            <Footer />
        </div>
    )
}