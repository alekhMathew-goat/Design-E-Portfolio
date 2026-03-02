import { Label } from "@/components/ui/label"

export const FormLabel = ({ htmlFor, children }: any) => {
    return (
        <Label htmlFor={htmlFor} className="text-base">
            {children}
        </Label>
    )
}