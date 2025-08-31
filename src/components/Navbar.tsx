"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"

export default function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <header className="p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-slate-700 transition-colors">
          🌉 Golden Gate Media
        </Link>
        <div className="flex gap-2 md:gap-6 items-center">
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6" aria-label="Main">
            <Link href="/#services" className="text-gray-600 hover:text-slate-700 transition-colors">
              Services
            </Link>
            <Link href="/#case-studies" className="text-gray-600 hover:text-slate-700 transition-colors">
              Case Studies
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-gray-600 hover:text-slate-700 transition-colors">
                Dashboard
              </Link>
            </SignedIn>
            <Link href="/contact" className="text-gray-600 hover:text-slate-700 transition-colors">
              Contact
            </Link>
          </nav>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
            <svg
              className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl={"/dashboard"}>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-gray-800">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.fullName || "User"}
                </div>
                <div className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                    userButtonPopoverCard: "shadow-lg border border-gray-200",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`${
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } md:hidden fixed inset-0 z-40 transition-opacity duration-200`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`ml-auto h-full w-80 max-w-[80%] bg-white border-l shadow-xl focus:outline-none flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold text-gray-800">Menu</span>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#case-studies"
                  className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Case Studies
                </Link>
              </li>
              <SignedIn>
                <li>
                  <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              </SignedIn>
              <li>
                <Link
                  href="/contact"
                  className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <SignedOut>
                <div className="flex gap-3">
                  <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl={"/dashboard"}>
                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-800">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.fullName || "User"}
                    </div>
                    <div className="truncate text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
                  </div>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 rounded-full",
                        userButtonPopoverCard: "shadow-lg border border-gray-200",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
