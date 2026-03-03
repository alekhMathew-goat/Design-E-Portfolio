"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface Props {
    href: string
    icon: LucideIcon
    title: string
    description: string
    color: string
    hoverBorder: string
    bgColor: string
    hoverBg: string
}

export const RoleCard = ({
    href,
    icon: Icon,
    title,
    description,
    color,
    hoverBorder,
    bgColor,
    hoverBg,
}: Props) => {
    return (
        <Link href={href} className="group">
            <Card
                className={`border-2 border-border ${hoverBorder} transition-all h-full cursor-pointer hover:shadow-lg`}
            >
                <CardContent className="pt-12 pb-12 text-center">
                    <div
                        className={`w-20 h-20 ${bgColor} ${hoverBg} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}
                    >
                        <Icon className={`w-10 h-10 ${color}`} />
                    </div>

                    <h2 className="text-2xl font-semibold text-text mb-4">
                        {title}
                    </h2>

                    <p className="text-lg text-muted-text leading-relaxed">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}