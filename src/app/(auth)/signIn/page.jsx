"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { login, user, isLoading } = useAuth()
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await login(email, password) // 로그인
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
    }
  }

  useEffect(() => {
    console.log('User status changed:', user); // ⭐ 이 부분 추가
    if (user) {
      console.log('Redirecting to /'); // ⭐ 이 부분 추가
      router.push('/');
    }
  }, [user, router]);

  // 로딩중 - 임시UI
  if (isLoading) { // <- 여기서 isLoading이 정의되지 않아 에러가 발생하거나 컴포넌트 렌더링에 문제가 생길 수 있습니다.
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4">인증 정보를 확인 중입니다...</p>
      </div>
    )
  }

  return (
    <Container className="mt-21 flex w-85.5 flex-col items-center justify-center gap-10">
      <Logo className="h-13.5 w-60" />
      <div className="flex w-85.5 flex-col gap-6">
        <EmailInput value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <PasswordInput value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      <SubmitButton type="로그인" onSubmit={handleLogin} />
      <div className="text-[#262626]">
        <span className="text-base">회원이 아니신가요? </span>
        <Link href="/" className="underline">
          <span className="text-base underline">회원가입하기</span>
        </Link>
      </div>
    </Container>
  );
}
