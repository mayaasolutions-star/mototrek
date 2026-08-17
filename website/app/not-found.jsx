import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] font-sans flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-md w-full text-center space-y-4">
        <h1 className="text-4xl font-black text-[#18382a]">404</h1>
        <h2 className="text-lg font-bold text-gray-900">Page Not Found</h2>
        <p className="text-xs text-gray-600 font-medium">
          The requested page or resource could not be found.
        </p>
        <Link
          href="/admin"
          className="inline-block w-full bg-[#18382a] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition"
        >
          Return to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
