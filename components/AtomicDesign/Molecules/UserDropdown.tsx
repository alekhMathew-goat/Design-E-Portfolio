"use client"
import { User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconButton } from "../Atoms/IconButton"

export const UserDropdown = ({ user, setUser }: any) => {
    const router = useRouter()

    const handleLogout = () => {
        logout()
        setUser(null)
        router.push("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton>
                    <User className="w-5 h-5" />
                </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {user ? (
                    <>
                        <DropdownMenuItem
                            onClick={() =>
                                router.push(user.role === "grandparent" ? "/profile/grandparent" : "/profile/helper")
                            }
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem onClick={() => router.push("/login")}>
                            Sign In
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/signup")}>
                            Sign Up
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}