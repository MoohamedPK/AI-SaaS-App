'use client'

import { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import clsx from "clsx"

const Links = [
  { name: "Home", href: "/" },
  { name: "Learning Companions", href: "/companion-library" },
  { name: "My Journey", href: "/profile" }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="py-4 px-6 md:px-12 flex justify-between items-center bg-color main-color relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image src={'/logo.svg'} alt="logo" width={50} height={50} />
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 items-center">
        {Links.map(link => (
          <li key={link.name} className="hover-effect font-semibold">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* Auth / User */}
      <div className="hidden md:flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className="text-sm font-medium px-4 py-2 rounded-md bg-zinc-900 text-white/80 hover:bg-zinc-800 transition"
          >
            Sign In
          </Link>
        </SignedOut>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-white focus:outline-none"
      >
        <Menu size={28} />
      </button>

      {/* Fullscreen Mobile Menu with transition */}
      <div
        className={clsx(
          "fixed inset-0 h-screen w-full bg-color main-color z-90 flex flex-col p-8 gap-8 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="text-white"
        >
          <X size={32} />
        </button>

        {/* Links */}
        <ul className="flex flex-col gap-6 text-center mt-16">
          {Links.map(link => (
            <li key={link.name} className="font-semibold text-xl hover-effect">
              <Link href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth / User */}
        <div className="flex flex-col gap-6 items-center mt-8">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium px-6 py-3 rounded-md bg-zinc-900 text-white/80 hover:bg-zinc-800 transition"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
