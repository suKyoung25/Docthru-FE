"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import PasswordConfirmationInput from "@/components/input/PasswordConfirmationInput";
import NicknameInput from "@/components/input/NicknameInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import GoogleLoginButton from "@/components/btn/auth/GoogleLoginButton";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import SignupModal from "@/components/modal/SignupModal";
import { validateEmail, validatePassword, validatePasswordConfirmation } from "@/lib/utils/authUtils";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [hasInputValue, setHasInputValue] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: ""
  });
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);

  const { register, isLoading } = useAuth();
  const router = useRouter();

  // 유효성 검사 함수
  const checkValidation = () => {
    const emailErr = validateEmail(values.email);
    const nicknameErr = values.nickname.trim() === "";
    const passwordErr = validatePassword(values.password);
    const passwordConfirmErr = validatePasswordConfirmation(values.password, values.passwordConfirmation);

    setEmailError(emailErr);
    setNicknameError(nicknameErr);
    setPasswordError(passwordErr);
    setPasswordConfirmationError(passwordConfirmErr);

    return !emailErr && !nicknameErr && !passwordErr && !passwordConfirmErr;
  };

  // 입력 필드 값 변경 시 실행되는 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;

    const newValues = { ...values, [id]: value };
    setValues(newValues);
    setHasInputValue(true);
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e) => {
    const { email, nickname, password, passwordConfirmation } = values;

    e.preventDefault();

    const isValid = checkValidation();
    if (!isValid) return;

    try {
      const result = await register(email, nickname, password, passwordConfirmation);
      if (result?.error) {
        setIsSignupSuccess(false);
        setIsModalOpen(true);
        setErrorMsg(result.message);
        return;
      }
      setIsSignupSuccess(true);
    } catch (error) {
      console.error("회원가입 실패", error);
      setErrorMsg(error.message);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleModal = () => {
    if (isSignupSuccess) {
      router.push("/signIn");
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <Container>
      <div className="mt-15 mb-30 flex flex-col items-center md:mt-30">
        <Logo className="mb-10 h-[54px] w-60 md:h-18 md:w-80" />
        <form className="mb-[18px] space-y-6" onSubmit={handleSubmit}>
          <EmailInput value={values.email} onChange={handleChange} error={emailError} />
          <NicknameInput value={values.nickname} onChange={handleChange} error={nicknameError} />
          <PasswordInput value={values.password} onChange={handleChange} error={passwordError} />
          <PasswordConfirmationInput
            value={values.passwordConfirmation}
            onChange={handleChange}
            error={passwordConfirmationError}
          />
          <SubmitButton type={isLoading ? "가입 중" : "회원가입"} loading={isLoading} hasInputValue={hasInputValue} />
        </form>
        <GoogleLoginButton />
        <div className="mt-6 space-x-2">
          <span>회원이신가요?</span>
          <Link href="/signIn" className="underline">
            로그인하기
          </Link>
        </div>
      </div>
      {isModalOpen && <SignupModal errorMsg={errorMsg} onClose={handleModal} />}
    </Container>
  );
}
