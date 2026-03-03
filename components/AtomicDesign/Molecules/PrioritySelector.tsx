"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { priorityLevels } from "../Data/requestData"

interface Props {
    value: string
    onChange: (value: string) => void
}

export const PrioritySelector = ({ value, onChange }: Props) => {
    return (
        <div className="space-y-3">
            <label className="text-base font-medium">Priority level</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                    {priorityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                            {level.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-sm text-muted-text">Higher priority requests are displayed first to helpers</p>
        </div>
    )
}