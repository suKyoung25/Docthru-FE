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
        width={24}
        height={24}
      />
    </div>
  );
}
