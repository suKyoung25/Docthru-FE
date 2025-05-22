"use client"

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import LoginButton from "@/components/login/LoginButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Container className="flex flex-col justify-center items-center gap-10 w-85.5 mt-21">
      <Logo className="w-60 h-13.5" />
      <div className="flex flex-col gap-6 w-85.5">
        <EmailInput />
        <PasswordInput />
      </div>
      <LoginButton />
      <div className="text-[#262626]">
        <span className="text-base">회원이 아니신가요? </span>
        <Link href="/" className="underline">
          <span className="text-base underline">회원가입하기</span>
        </Link></div>
    </Container >
  )
}
