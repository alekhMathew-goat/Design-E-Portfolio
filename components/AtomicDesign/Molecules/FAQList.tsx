"use client"

import { FAQItem } from "../Atoms/FAQItem"
import { faqData } from "../Data/faqData"

export const FAQList = () => {
    return (
        <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden">
            <h2 className="text-center mb-4 text-2xl font-bold">FAQ - EdTech Platform</h2>
            {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
    )
}