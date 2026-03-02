"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "./FormField"

interface ProfileFormProps {
    initialValues: {
        name: string
        age: string
        phone: string
        emergencyContact: string
    }
    onSave: (data: any) => void
}

export const ProfileForm = ({ initialValues, onSave }: ProfileFormProps) => {
    const [name, setName] = useState(initialValues.name)
    const [age, setAge] = useState(initialValues.age)
    const [phone, setPhone] = useState(initialValues.phone)
    const [emergencyContact, setEmergencyContact] = useState(initialValues.emergencyContact)

    return (
        <div className="space-y-6">
            <FormField
                label="Name"
                id="name"
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
            />
            <FormField
                label="Age"
                id="age"
                type="number"
                value={age}
                onChange={(e: any) => setAge(e.target.value)}
            />
            <FormField
                label="Phone"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
            />
            <FormField
                label="Emergency Contact"
                id="emergencyContact"
                type="text"
                value={emergencyContact}
                onChange={(e: any) => setEmergencyContact(e.target.value)}
                placeholder="Daughter — +000 000 0000"
            />

            <Button
                onClick={() => onSave({ name, age, phone, emergencyContact })}
                className="w-full bg-[#dd673c] hover:bg-[#dd673c]/20 text-white hover:text-black h-14"
            >
                Save
            </Button>
        </div>
    )
}