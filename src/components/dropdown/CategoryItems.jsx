import React from "react";
import icToggleDown from "../../assets/icon/ic_toggle_down.svg"
import Image from "next/image";

export default function CategoryItems() {
  return <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between rounded-lg">
    <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between p-4 rounded-t-lg">
      <span className="text-[#A3A3A3] text-[16px]">Next.js</span>
    </div>
    <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between p-4">
      <span className="text-[#A3A3A3] text-[16px]">API</span>
    </div>
    <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between p-4">
      <span className="text-[#A3A3A3] text-[16px]">Career</span>
    </div>
    <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between p-4">
      <span className="text-[#A3A3A3] text-[16px]">Modern JS</span>
    </div>
    <div className="flex flex-col bg-white w-200 h-14 border-[#E5E5E5] border items-center justify-between p-4 rounded-b-lg">
      <span className="text-[#A3A3A3] text-[16px]">Web</span>
    </div>
  </div>;
}