"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface Props {
    question: string
    answer: string
}

export const FAQItem = ({ question, answer }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b last:border-b-0 py-4">
            <button
                type="button"
                className="flex w-full items-center justify-between text-left cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-lg">{question}</h3>
                <ChevronDown
                    className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
        </div>
    )
}