import Link from "next/link"
interface Props {
    href: string
    label: string
    onClick?: () => void
}

export const NavLink = ({ href, label, onClick }: Props) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-base text-muted-text hover:text-text transition-colors"
        >
            {label}
        </Link>
    )
}