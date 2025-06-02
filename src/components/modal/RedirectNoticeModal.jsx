"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function RedirectNoticeModal({ text, buttonText = "이동하기", redirectUrl, className = "" }) {
  const router = useRouter();

  const handleConfirm = () => {
    router.push(redirectUrl);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${className}`}>
      <div className="w-full max-w-sm rounded-md bg-white p-6 text-center shadow-xl">
        <p className="mb-4 text-gray-800">{text}</p>
        <button onClick={handleConfirm} className="mt-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
