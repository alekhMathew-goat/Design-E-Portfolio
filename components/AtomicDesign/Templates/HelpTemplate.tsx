"use client"

import { Header } from "../Organisms/Header"
import { Footer } from "@/components/footer"
import { HelpCards } from "../Organisms/HelpCards"
import { FAQList } from "../Molecules/FAQList"

export const HelpTemplate = () => {
    return (
        <div className=" min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex flex-col items-center">
                <main className="container flex-1 py-16">
                    <HelpCards />
                    <div className="mt-12">
                        <FAQList />
                    </div>
                </main>

            </div>
            <Footer />
        </div>
    )
}