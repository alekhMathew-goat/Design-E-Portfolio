// IconButton.tsx =====================
"use client"
import React from "react"
import { Button } from "@/components/ui/button"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
    ({ children, ...props }, ref) => {
        return (
            <Button
                ref={ref}          // forward the ref here
                variant="outline"
                size="icon"
                className="border-2 bg-transparent"
                {...props}         // pass all props like onClick
            >
                {children}
            </Button>
        )
    }
)

IconButton.displayName = "IconButton"