import "./globals.css";
import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";
import Providers from "./provider";

// --- Auth 관련 임포트 추가 ---
import AuthProvider from '@/providers/AuthProvider';
import { getServerSideToken } from '@/lib/actions/auth';
import { userService } from '@/lib/service/userService';
// ----------------------------

const pretendard = localFont({
  src: "../assets/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const quanticoRegular = localFont({
  src: "../assets/font/QuanticoRegular.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-quantico-regular",
});

const quanticoBold = localFont({
  src: "../assets/font/QuanticoBold.ttf",
  display: "swap",
  weight: "700",
  variable: "--font-quantico-bold",
});

export const metadata = {
  title: "Docthur - 독스루",
  description: "개발문서 번역 플랫폼",
};

// RootLayout을 async 함수로 변경하여 서버 사이드에서 데이터 페칭 가능하게 함
export default async function RootLayout({ children }) {
  let initialUser = null;
  let initialLoading = true; // 초기 로딩 상태를 true로 설정 (데이터 페칭 중)

  try {
    const accessToken = await getServerSideToken('accessToken');
    const refreshToken = await getServerSideToken('refreshToken');

    if (accessToken || refreshToken) {
      // 토큰이 있다면 사용자 정보 가져오기 시도
      initialUser = await userService.getMe();
    }
  } catch (error) {
    console.error("RootLayout에서 초기 사용자 정보 로드 실패:", error);
    initialUser = null;
  } finally {
    initialLoading = false; // 데이터 페칭 완료 후 로딩 상태를 false로 변경
  }

  return (
    <html lang="ko">
      <link rel="icon" href="/favicon.svg" />
      <body
        className={`${pretendard.variable} font-pretendard flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider initialUser={initialUser} initialLoading={initialLoading}>
          <Providers>
            <main className="flex-grow pb-16">{children}</main>
          </Providers>
        </AuthProvider>
        <DevNavigation />
      </body>
    </html>
  );
}