"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import SuccessModal from "@/components/modal/SuccessModal";

export default function GoogleCallbackClient() {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { googleLogin } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    // 함수 선언과 동시에 실행
    (async () => {
      try {
        await googleLogin(code);
      } catch {
        setShowModal(true);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
      {showModal && (
        <SuccessModal
          text="구글 로그인에 실패했습니다."
          onClose={() => {
            setShowModal(false);
            router.replace("/signIn");
          }}
        />
      )}
    </>
  );
}
