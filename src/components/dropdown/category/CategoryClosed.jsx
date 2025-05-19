import React from "react";
import icToggleDown from "../../../assets/icon/ic_toggle_down.svg"
import Image from "next/image";

export default function CategoryClosed() {
  return <div className="flex bg-white w-200 h-14 border-[#E5E5E5] border-1 items-center justify-between p-4 rounded">
    <span className="text-[#A3A3A3] text-[16px]">카테고리</span>
    <Image src={icToggleDown} alt="Toggle Down Icon" width={24} height={24} />
  </div>;
}