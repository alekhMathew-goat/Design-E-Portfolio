import { NavLink } from "../Atoms/NavLink"
export const DesktopNav = ({ user }: any) => {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Home" />
            {user && (
                <>
                    <NavLink href="/request/new" label="Post Request" />
                    <NavLink href="/requests" label="Requests" />
                    <NavLink
                        href={user.role === "grandparent" ? "/profile/grandparent" : "/profile/helper"}
                        label="Profile"
                    />
                </>
            )}
            <NavLink href="/help" label="Help & Safety" />
        </nav>
    )
}