import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"


const Links = [{name: "Home", href: "/"}, {name: "Learning Companions", href: "/companion-library"}, {
    name: "My Journey", href: "/profile"
}]

const Navbar = () => {
  return (
    <nav className="py-4 px-12 flex-between bg-color main-color z-90">
        <div className="logo">
            <Image src={'/logo.svg'} alt="logo" width={50} height={50}/>
        </div>

        <ul className="flex-items ">
            {Links.map(link => (
                <li key={link.name} className="hover-effect font-semibold">
                    <Link href={link.href}>{link.name}</Link>
                </li>
            ))}
        </ul>

        {/* user Profile */}
        {/* Clerk Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          
          <Link
            href="/sign-in"
            className="text-sm font-medium rounded-bg hover:opacity-75 transition-all duration-300"
          >
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Navbar