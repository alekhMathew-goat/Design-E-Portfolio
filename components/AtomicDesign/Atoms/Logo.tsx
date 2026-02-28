"use client"
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/images/Logos.png"
export const Logo = () => {
    return (
        <Link href="/">
            <Image src={logo} alt="Gran-assist Logo" width={80} height={80} />
        </Link>
    )
}