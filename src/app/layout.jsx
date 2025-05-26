// app/layout.js
import "./globals.css"; // 기존 글로벌 스타일 임포트
import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";
import Providers from "./provider"; // 기존 Providers 임포트

// --- Auth 관련 임포트 추가 ---
import AuthProvider from '@/providers/AuthProvider'; // AuthProvider 경로를 정확히 확인하세요
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
  // let isAuthenticated = false; // 이 플래그는 AuthProvider 내부에서 user 상태로 충분히 관리됩니다.

  try {
    // 서버 컴포넌트에서 직접 쿠키에 접근하여 토큰 존재 여부 확인
    const accessToken = await getServerSideToken('accessToken');
    const refreshToken = await getServerSideToken('refreshToken');

    if (accessToken || refreshToken) {
      // 토큰이 있다면 사용자 정보 가져오기 시도
      // userService.getMe()는 tokenFetch를 사용하므로, 토큰 갱신 로직이 포함되어 있습니다.
      initialUser = await userService.getMe();
      // isAuthenticated = true; // 필요하면 사용하세요, user 객체 존재 여부로 판단 가능
    }
  } catch (error) {
    console.error("RootLayout에서 초기 사용자 정보 로드 실패:", error);
    // 에러 발생 시 (예: 토큰 만료 및 갱신 실패) 사용자를 null로 설정
    initialUser = null;
    // isAuthenticated = false;
  }

  return (
    <html lang="ko">
      <link rel="icon" href="/favicon.svg" />
      <body
        className={`${pretendard.variable} font-pretendard flex min-h-screen flex-col antialiased`}
      >
        {/* AuthProvider를 Providers 컴포넌트 밖에 배치하여 전체 앱을 감싸도록 합니다. */}
        {/* 초기 사용자 정보와 로딩 상태를 AuthProvider에 prop으로 전달 */}
        <AuthProvider initialUser={initialUser} initialLoading={false}>
          <Providers>
            <main className="flex-grow pb-16">{children}</main>
          </Providers>
        </AuthProvider>
        <DevNavigation />
      </body>
    </html>
  );
}