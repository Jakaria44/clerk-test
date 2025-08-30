import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-8">
      <main className="text-center max-w-2xl mx-auto">
        <div className="mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Choose where you'd like to go
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/public"
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl hover:scale-105 min-w-[200px]"
          >
            <div className="text-2xl mb-2">🌐</div>
            <div className="text-lg font-bold">Public</div>
            <div className="text-sm text-gray-500">Open to everyone</div>
          </Link>

          <SignedIn>
            <Link
              href="/private"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 min-w-[200px]"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-lg font-bold">Private</div>
              <div className="text-sm text-indigo-200">Members only</div>
            </Link>
          </SignedIn>

          <SignedOut>
            <div className="bg-gray-300 text-gray-500 font-semibold py-4 px-8 rounded-lg shadow-lg min-w-[200px] cursor-not-allowed">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-lg font-bold">Private</div>
              <div className="text-sm">Sign in required</div>
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}