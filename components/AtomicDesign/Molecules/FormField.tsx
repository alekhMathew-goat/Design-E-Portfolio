import { FormLabel } from "../Atoms/FormLabel"
import { FormInput } from "../Atoms/FormInput"

interface Props {
    label: string
    id: string
    type: string
    value: string
    onChange: any
    placeholder?: string
    required?: boolean

}

export const FormField = ({
    label,
    id,
    type,
    value,
    onChange,
    placeholder,
    required,
}: Props) => {
    return (
        <div className="space-y-2">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormInput
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}