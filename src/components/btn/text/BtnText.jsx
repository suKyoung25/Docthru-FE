"use client";

import React from "react";
import Image from "next/image";
import iconWithDraw from "@/assets/icon/ic_withdraw.svg";
import iconLink from "@/assets/icon/ic_arrow_right_up.svg";
import goToMyWork from "@/assets/icon/ic_arrow_right.svg";
import continueChallenge from "@/assets/icon/ic_document.svg";

const themes = {
  tonal: "bg-[#FFE7E7] text-[#fe4744]",
  solidblack: "bg-[var(--color-brand-black)] text-white",
  solidwhite: "bg-gray-200 text-gray-500",
  outline: " border border-gray-800 bg-gray-50 text-gray-800",
  link: "bg-opacity-50 bg-[#F6F8FA] text-gray-700",
};

const iconMap = {
  goToMyWork: {
    src: goToMyWork,
    alt: "내 작업물 보기",
  },
  continueChallenge: {
    src: continueChallenge,
    alt: "도전 계속하기",
  },
};

// 사용법
// w,h,p 속성등 추가 스타일링은 className props 사용
export default function BtnText({ theme, icon, onClick, className, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-full w-full items-center justify-center rounded-[10px] text-sm font-semibold sm:rounded-xl sm:text-base ${className} ${themes[theme]}`}
    >
      {
        // icon이 true면서 theme가 tonal일 경우 포기 아이콘 보여주기
        icon && theme === "tonal" ? (
          <div className="flex items-center justify-center gap-2">
            <span className="hidden sm:inline">포기</span>
            <Image
              src={iconWithDraw}
              alt="포기하기"
              className="h-4 w-4 sm:h-6 sm:w-6"
            />
          </div>
        ) : (
          <div>{children}</div>
        )
      }

      {
        // theme가 link일 경우 link 아이콘 보여주기
        theme === "link" && (
          <div>
            <Image src={iconLink} alt="링크" className="h-6 w-6" />
          </div>
        )
      }
    </button>
  );
}

export function BtnRoundedWithIcon({
  children,
  iconType = "continueChallenge",
}) {
  return (
    <button
      className={`flex h-8 w-full items-center justify-center gap-1 rounded-full border border-gray-800 bg-[var(--color-gray-50)] text-sm font-semibold sm:rounded-full`}
    >
      <div>{children}</div>
      <div>
        <Image
          src={iconMap[iconType].src}
          alt={iconMap[iconType].alt}
          className="h-4 w-4"
        />
      </div>
    </button>
  );
}
