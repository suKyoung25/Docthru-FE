"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Container className="mt-21 flex w-85.5 flex-col items-center justify-center gap-10">
      <Logo className="h-13.5 w-60" />
      <div className="flex w-85.5 flex-col gap-6">
        <EmailInput />
        <PasswordInput />
      </div>
      <SubmitButton type="로그인" />
      <div className="text-[#262626]">
        <span className="text-base">회원이 아니신가요? </span>
        <Link href="/" className="underline">
          <span className="text-base underline">회원가입하기</span>
        </Link>
      </div>
    </Container>
  );
}
