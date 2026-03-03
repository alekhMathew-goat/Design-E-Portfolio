"use client"

import { Header } from "../Organisms/Header"
import { Footer } from "@/components/footer"
import { NewRequestForm } from "../Organisms/NewRequestForm"
import useFirstVisit from "@/hooks/use-first-visit"
import { getCurrentUser, saveRequest } from "@/lib/auth"

export const NewRequestTemplate = () => {
    const [seenPostTip, markSeenPostTip] = useFirstVisit("seen_post_request_tip")
    const user = getCurrentUser()

    if (!user) return null

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 py-16 px-4">
                <NewRequestForm
                    user={user}
                    seenTip={seenPostTip}
                    markSeenTip={markSeenPostTip}
                    saveRequest={saveRequest}
                />
            </main>
            <Footer />
        </div>
    )
}