"use client";

import React from "react";
import Image from "next/image";
import userImage from "@/assets/img/profile_member.svg";
import { useRouter } from "next/navigation";
// import adminImage from "@/assets/img/profile_admin.svg"

function Profile() {
  const router = useRouter;

  const handleClickMychallenge = () => {
    //디버깅
    console.log("나의 챌린지 페이지로 이동");

    // Url은 아직 미정입니다. 아래는 예시입니다
    router.push("/my/challanges");
  };

  const handleClickLogout = () => {
    //디버깅
    console.log("로그아웃 버튼 클릭");

    // Url은 아직 미정입니다. 아래는 예시입니다
    router.push("/login");
  };
  return (
    <div className="flex w-[152px] flex-col items-start rounded-[8px] bg-[#FFFFFF] px-[16px] pt-[16px] pb-[8px]">
      <div className="flex w-[120px] flex-row justify-baseline gap-[8px] border-b-2 border-[#F5F5F5] pb-[8px]">
        {/* DB에서 불러온 유저 ROLE로 변경 필수 (어드민 이미지 import 완료) */}
        <Image src={userImage} alt="일반 유저 프로필" />
        <div className="flex flex-col gap-[2px]">
          {/* DB에서 불러온 유저 이름으로 변경 필수 */}
          <div className="text-[14px] font-medium text-[var(--color-gray-800)]">
            체다치즈
          </div>
          {/* DB에서 불러온 유저 등급으로 변경 필수 */}
          <div className="text-[12px] font-medium text-[var(--color-gray-500)]">
            전문가
          </div>
        </div>
      </div>
      <button
        className="pt-[15px] text-[16px] font-medium text-[var(--color-gray-800)]"
        onClick={handleClickMychallenge}
      >
        나의 챌린지
      </button>
      <button
        className="text-[14px] font-medium text-[var(--color-gray-400)]"
        onClick={handleClickLogout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
