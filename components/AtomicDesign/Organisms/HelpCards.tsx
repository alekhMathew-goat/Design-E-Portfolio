"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, HeartHandshake } from "lucide-react"
import { useState } from "react"

export const HelpCards = () => {
    const [activeCard, setActiveCard] = useState<null | string>(null)

    const toggleCard = (card: string) => {
        setActiveCard(activeCard === card ? null : card)
    }

    return (
        <div className="border-2 border-border space-y-6 m-2 p-6 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-8">
                Help & Safety
            </h1>

            <div className="!flex justify-center gap-6">
                <Card
                    className="w-full md:w-1/2 border-2 border-warning/30 bg-warning/5 cursor-pointer"
                    onClick={() => toggleCard("volunteers")}
                >
                    <CardContent className="pt-2">
                        <div className="flex gap-4 items-center">
                            <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
                            <h2 className="text-xl font-semibold text-text">
                                Meeting Volunteers Safely
                            </h2>
                        </div>
                        {activeCard === "volunteers" && (
                            <p className="text-muted-text leading-relaxed mt-3">
                                If someone is in immediate danger or needs urgent medical care,
                                call <strong>112</strong> or contact local emergency services
                                right away.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card
                    className="w-full md:w-1/2 border-2 border-border cursor-pointer"
                    onClick={() => toggleCard("demo")}
                >
                    <CardContent className="pt-2">
                        <div className="flex gap-4 items-center">
                            <HeartHandshake className="w-8 h-8 text-[#50966d] flex-shrink-0" />
                            <h2 className="text-xl font-semibold text-text">Scope of this demo</h2>
                        </div>
                        {activeCard === "demo" && (
                            <p className="text-muted-text leading-relaxed mt-3">
                                This is a prototype model for a school project. It does not
                                process or store real data.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}