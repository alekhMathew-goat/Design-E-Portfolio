"use client"
import { Input } from "@/components/ui/input"
import React from "react"

interface FormInputProps {
    id: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
}

export const FormInput = ({
    id,
    type,
    value,
    onChange,
    placeholder,
    required,
}: FormInputProps) => {
    return (
        <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="h-12 border border-gray-400 !focus:ring-0 !shadow-none placeholder:text-gray-400"
        />
    )
}