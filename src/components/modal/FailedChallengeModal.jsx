import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>
        <div className="mb-4 text-gray-700">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-[var(--color-brand-black)] px-4 py-2 text-white hover:opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
