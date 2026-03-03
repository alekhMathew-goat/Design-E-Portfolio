"use client"

import { FormField } from "../Molecules/FormField"
import { Button } from "@/components/ui/button"

interface Props {
    values: {
        name: string
        phone: string
        bio: string
        specialties: string
        experience: string
    }
    onChange: (field: string, value: string) => void
    onSave: () => void
}

export const HelperProfileForm = ({ values, onChange, onSave }: Props) => {
    return (
        <div className="space-y-6">
            <FormField
                label="Name"
                id="name"
                type="text"
                value={values.name}
                onChange={(e: any) => onChange("name", e.target.value)}
            />

            <FormField
                label="Phone"
                id="phone"
                type="tel"
                value={values.phone}
                onChange={(e: any) => onChange("phone", e.target.value)}
            />

            <FormField
                label="Bio"
                id="bio"
                type="text"
                value={values.bio}
                placeholder="Tell us about yourself"
                onChange={(e: any) => onChange("bio", e.target.value)}
            />

            <FormField
                label="Specialties"
                id="specialties"
                type="text"
                value={values.specialties}
                placeholder="e.g., Gardening, Cooking"
                onChange={(e: any) => onChange("specialties", e.target.value)}
            />

            <FormField
                label="Years of Experience"
                id="experience"
                type="number"
                value={values.experience}
                placeholder="e.g., 5"
                onChange={(e: any) => onChange("experience", e.target.value)}
            />

            <Button
                onClick={onSave}
                className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white"
            >
                Save
            </Button>
        </div>
    )
}