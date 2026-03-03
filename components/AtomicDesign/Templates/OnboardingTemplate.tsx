"use client"

import { Header } from "@/components/AtomicDesign/Organisms/Header"
import { Footer } from "@/components/footer"
import { OnboardingSelection } from "../Organisms/OnboardingSelection"

interface Props {
    userName: string
}

export const OnboardingTemplate = ({ userName }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-16 px-4">
                <OnboardingSelection userName={userName} />
            </main>

            <Footer />
        </div>
    )
}