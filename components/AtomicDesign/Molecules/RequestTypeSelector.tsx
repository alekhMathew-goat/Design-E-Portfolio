"use client"
import { ButtonOption } from "../Atoms/ButtonOption"
import { requestTypes } from "../Data/requestData"

interface Props {
    selectedType: string
    onSelect: (value: string) => void
}

export const RequestTypeSelector = ({ selectedType, onSelect }: Props) => {
    return (
        <div className="space-y-3">
            <label className="text-base font-medium">Select request type</label>
            <div className="grid gap-3">
                {requestTypes.map((type) => (
                    <ButtonOption
                        key={type.value}
                        label={type.label}
                        icon={type.icon}
                        selected={selectedType === type.value}
                        onClick={() => onSelect(type.value)}
                    />
                ))}
            </div>
        </div>
    )
}