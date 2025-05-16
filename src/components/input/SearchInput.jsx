import React from "react";
import Image from "next/image";
import search from "@/assets/icon/ic_search.svg";

function SearchInput({ text }) {
  return (
    <>
      <div className="relative flex items-center">
        <Image
          src={search}
          class="absolute left-[8px] h-[24px] w-[24px]"
          alt="검색 돋보기"
        />
        <input
          className={`h-[40px] w-full rounded-[20px] bg-[#FFFFFF] pl-[36px] ${text} placeholder-[var(--color-gray-400)]`}
          placeholder="챌린지 이름을 검색해보세요"
        />
      </div>
    </>
  );
}

export default SearchInput;
