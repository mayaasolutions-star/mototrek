"use client";

import React from "react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1f241f] font-sans flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-md w-full text-center space-y-4">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-gray-900">Something went wrong!</h2>
        <p className="text-xs text-gray-600 font-medium">
          {error?.message || "A component encountered a runtime error."}
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#18382a] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#c45d2a] transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
