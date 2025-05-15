import React from "react";

export default function CallengeContainerd() {
  return (
    <>
      <div className="flex h-[176px] w-[285px] flex-col items-center justify-center gap-[16px] rounded-2xl bg-[var(--color-gray-100)] font-[var(--font-pretendard)]">
        <div className="flex h-[24px] w-[253px] flex-row items-center justify-between text-[13px]">
          <img src="" />
          2024년 3월 3일 마감
          <img src="" />
          15/15
        </div>
        <div className="flex w-[253px] flex-col gap-[8px]">
          <div className="flex h-[40px] items-center justify-center rounded-xl border-2 bg-[var(--color-brand-yellow)] text-[14px] font-bold">
            원문 보기
          </div>
          <div className="flex h-[40px] items-center justify-center rounded-xl border-2 bg-[var(--color-gray-800)] text-[14px] font-bold text-[#FFFFFF]">
            작업 도전하기
          </div>
        </div>
      </div>
    </>
  );
}
