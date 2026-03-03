"use client"
import React from "react"
interface Props {
    label: string
    selected: boolean
    onClick: () => void
    icon: React.ElementType
}

export const ButtonOption = ({ label, selected, onClick, icon: Icon }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`p-4 rounded-lg border-2 text-left transition-all flex items-center gap-4 ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
        >
            <Icon className={`w-6 h-6 !text-[#50966d] ${selected ? "text-[#50966d]" : "text-muted-text"}`} />
            <span className="text-base font-medium text-text">{label}</span>
        </button>
    )
}