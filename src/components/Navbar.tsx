"use client";

import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="p-4 border-b bg-white/80 backdrop-blur-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
        >
          Our App
        </Link>
        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Sign In
              </button>
            </SignInButton>
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
