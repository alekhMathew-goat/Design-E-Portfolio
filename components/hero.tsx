import Image from "next/image";
import logo from "@/app/images/hero.jpeg"
import Link from "next/link"
export default function Hero() {
  return (
    <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden  ">
      <Link href="/signup">
        <Image src={logo} alt="Gran-assist Logo" className="object-contain w-full" />
      </Link>
    </div>
  )
}
