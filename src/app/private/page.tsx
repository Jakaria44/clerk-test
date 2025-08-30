import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PrivatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 flex items-center justify-center p-8">
      <SignedIn>
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-6">
              PRIVATE AREA
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Welcome to the members-only section
            </p>
            <div className="text-4xl mb-8">🔒</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Exclusive Content
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              This is a private area only accessible to authenticated users.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              You have access to premium features and content here.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-6">🔒</h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Access Denied
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              This page requires authentication
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
            <p className="text-lg text-gray-600 mb-6">
              You need to sign in to access this private area.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to continue.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
