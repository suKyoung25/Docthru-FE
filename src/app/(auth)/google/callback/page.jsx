import LoadingSpinner from "@/components/loading/LoadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

/**
 * useSearchParams(클라이언트 훅)이 들어 있는 컴포넌트를
 * 서버 컴포넌트에서 안전하게 로딩할 수 있도록 Suspense로 감쌈
 */
const GoogleCallbackClient = dynamic(() => import("./Client"), { ssr: false });

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleCallbackClient />
    </Suspense>
  );
}
