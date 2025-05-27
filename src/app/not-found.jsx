import React from "react";

export default function NotFound() {
  return (
    <div class="bg-gray-50 text-gray-800">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="text-center">
          <h1 class="text-7xl font-extrabold">404</h1>
          <p class="text-2xl font-medium mt-6">Oops! Page not found</p>
          <p class="mt-4 mb-8 text-base">The page you're looking for doesn't exist or has been moved.</p>
          <a
            href="/"
            class="inline-block bg-black text-white font-semibold rounded-full px-6 py-2 hover:bg-gray-700 transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
