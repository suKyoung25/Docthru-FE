"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import ConfirmPasswordInput from "@/components/input/ConfirmPasswordInput";
import NicknameInput from "@/components/input/NicknameInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import GoogleLoginButton from "@/components/btn/auth/GoogleLoginButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";
import { useState } from "react";
import { BASE_URL } from "@/constant/constant";

export default function SignUpPage() {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  // 입력 필드 값 변경 시 실행되는 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;

    const newValues = { ...values, [id]: value };
    setValues(newValues);

    const isValid =
      newValues.email.trim() !== "" &&
      newValues.nickname.trim() !== "" &&
      newValues.password.trim() !== "" &&
      newValues.passwordConfirmation.trim() !== "";
    setIsInputValid(isValid);
    console.log(isValid);
  };

  const signUp = async () => {
    const { email, nickname, password, confirmPassword } = values;

    return await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, nickname, password, confirmPassword }),
      credentials: "include",
    });
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signUp();
    console.log(result);
  };

  return (
    <Container>
      <div className="mt-15 mb-30 flex flex-col items-center md:mt-30">
        <Logo className="mb-10 h-[54px] w-60 md:h-18 md:w-80" />
        <form className="mb-[18px] space-y-6" onSubmit={handleSubmit}>
          <EmailInput
            value={values.email}
            onChange={handleChange}
            error={isInputValid}
          />
          <NicknameInput
            value={values.nickname}
            onChange={handleChange}
            error={isInputValid}
          />
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            error={isInputValid}
          />
          <ConfirmPasswordInput
            value={values.confirmPassword}
            onChange={handleChange}
            error={isInputValid}
          />
          <SubmitButton type="회원가입" />
        </form>
        <GoogleLoginButton />
        <div className="mt-6 space-x-2">
          <span>회원이신가요?</span>
          <Link href="/signIn" className="underline">
            로그인하기
          </Link>
        </div>
      </div>
    </Container>
  );
}
