"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { preferredTimes } from "../Data/requestData"

interface Props {
    value: string
    onChange: (value: string) => void
}

export const PreferredTimeSelector = ({ value, onChange }: Props) => {
    return (
        <div className="space-y-3">
            <label className="text-base font-medium">Preferred time</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent>
                    {preferredTimes.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                            {time.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}