import Link from "next/link";

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-200 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">PUBLIC AREA</h1>
          <p className="text-2xl text-gray-600 mb-8">
            This page is open to everyone
          </p>
          <div className="text-4xl mb-8">🌐</div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Public Space
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            This is a public area where anyone can visit. No authentication
            required!
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Feel free to explore and enjoy the content here.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
