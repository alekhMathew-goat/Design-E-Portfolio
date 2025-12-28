"use client"

import React from "react"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  onClose: () => void
}

export function OnboardingTip({ title, description, onClose }: Props) {
  return (
    <div className="mb-6 p-4 border-2 border-border rounded-lg bg-primary/5 flex items-start justify-between">
      <div>
        <h3 className="text-base font-semibold text-text">{title}</h3>
        <p className="text-sm text-muted-text mt-1">{description}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onClose} className="h-9">
          Got it
        </Button>
      </div>
    </div>
  )
}

export default OnboardingTip
