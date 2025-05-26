import React from "react";

export default function CategoryItems() {
  return (
    <div className="flex h-14 flex-col items-center justify-between rounded-lg border border-[#E5E5E5] bg-white">
      <div className="flex h-14 w-full flex-col items-center justify-between rounded-t-lg border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Next.js</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">API</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Career</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Modern JS</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between rounded-b-lg border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Web</span>
      </div>
    </div>
  );
}
