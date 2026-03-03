// ProfileItem.tsx ==============
"use client"
import { ReactNode } from "react"

interface ProfileItemProps {
    icon: ReactNode
    label: string
    value: string
    bgColor?: string
}

export const ProfileItem = ({ icon, label, value, bgColor = "bg-[#50966d]/5" }: ProfileItemProps) => {
    return (
        <div className={`flex items-center gap-4 p-4 bg-[#dd673c]/4  rounded-lg`}>
            {icon}
            <div>
                <p className="text-lg text-muted-text">{label}</p>
                <p className="text-lg font-medium text-text">{value}</p>
            </div>
        </div>
    )
}