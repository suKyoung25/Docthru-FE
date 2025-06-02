"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const RefreshLogin = () => {
  const { autoLogin } = useAuth();

  useEffect(() => {
    const handleTokenRefresh = async () => {
      try {
        await autoLogin();
        // 토큰 갱신 성공 시 챌린지 페이지로 이동
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
      }
    };

    handleTokenRefresh();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoadingSpinner classname="mb-4" />
      <div className="text-center">
        <h1 className="mb-4 text-xl font-bold">자동 로그인 처리 중...</h1>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default RefreshLogin;
