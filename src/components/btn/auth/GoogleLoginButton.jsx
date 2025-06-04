import Image from "next/image";
import React from "react";
import googleIcon from "@/assets/icon/ic_google.svg";
import { BASE_URL } from "@/constant/constant";

export function GoogleLoginButton() {
  return (
    <button
      className="flex h-12 w-[343px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white md:w-[518px]"
      onClick={() => (window.location.href = `${BASE_URL}/auth/google`)}
    >
      <Image src={googleIcon} alt="구글 아이콘" width={28} height={28} />
      <p>Google로 시작하기</p>
    </button>
  );
}

export default GoogleLoginButton;
