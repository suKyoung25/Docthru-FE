<<<<<<< HEAD
"use client";

import React from "react";
import icToggleDown from "../../../assets/icon/ic_toggle_down.svg";
import icToggleUp from "../../../assets/icon/ic_toggle_up.svg";
import Image from "next/image";

export default function CategoryClosed({ isOpen, onClick, label }) {
  return (
    <div className="mt-[8px] flex h-14 items-center justify-between rounded border-1 border-[#E5E5E5] px-[20px]">
      <span className="text-[16px] text-[#A3A3A3]">{label}</span>
      <Image
        onClick={onClick}
        src={isOpen ? icToggleUp : icToggleDown}
        alt="Toggle Icon"
=======
import React from "react";
import icToggleDown from "../../../assets/icon/ic_toggle_down.svg";
import Image from "next/image";

export default function CategoryClosed({ setIsCategory }) {
  return (
    <div className="flex h-14 items-center justify-between rounded border-1 border-[#E5E5E5]">
      <span className="pl-[20px] text-[16px] text-[#A3A3A3]">카테고리</span>
      <Image
        onClick={() => {
          //디버깅
          console.log("카테고리버튼 클릭");
          setIsCategory((prev) => !prev);
        }}
        src={icToggleDown}
        alt="Toggle Down Icon"
>>>>>>> dev
        width={24}
        height={24}
      />
    </div>
  );
}
