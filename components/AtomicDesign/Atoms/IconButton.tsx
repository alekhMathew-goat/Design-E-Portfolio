import { Button } from "@/components/ui/button"
interface Props {
    children: React.ReactNode
    onClick?: () => void
}

export const IconButton = ({ children, onClick }: Props) => {
    return (
        <Button variant="outline" size="icon" className="border-2 bg-transparent" onClick={onClick}>
            {children}
        </Button>
    )
}