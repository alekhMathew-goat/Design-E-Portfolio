import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormLabel } from "../Atoms/FormLabel"

interface Props {
    role: "grandparent" | "helper"
    setRole: (role: "grandparent" | "helper") => void
}

export const RoleSelect = ({ role, setRole }: Props) => {
    return (
        <div className="space-y-2">
            <FormLabel htmlFor="role">I am a</FormLabel>
            <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="grandparent">Grandparent</SelectItem>
                    <SelectItem value="helper">Helper</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}