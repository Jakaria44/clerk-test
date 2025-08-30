"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-slate-700 transition-colors"
        >
          🌉 Golden Gate Media
        </Link>
        <div className="flex gap-6 items-center">
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#services"
              className="text-gray-600 hover:text-slate-700 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#case-studies"
              className="text-gray-600 hover:text-slate-700 transition-colors"
            >
              Case Studies
            </Link>
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-slate-700 transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-slate-700 transition-colors"
            >
              Contact
            </Link>
          </nav>
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
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.fullName || "User"}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
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
    </header>
  );
}
