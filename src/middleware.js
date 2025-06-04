import { NextResponse } from "next/server";
import { decodeAccessToken } from "./lib/utils/decodeAccessToken";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // accessToken이 있다면 검증
  let userRole;
  if (accessToken) {
    const decoded = await decodeAccessToken(accessToken);
    userRole = decoded?.role;
  }

  const isAuthenticated = !!refreshToken;
  const isAuthRoute = pathname.startsWith("/signIn") || pathname.startsWith("/signUp");
  const isProtectedRoute = pathname.startsWith("/challenges") || pathname.startsWith("/admin");
  const isAutoLoginPage = pathname.startsWith("/refreshLogin");

  // ✅ 로그인된 사용자가 루트("/") 경로 접근 시 → 챌린지 페이지로 리디렉션
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }

  // ✅ 어드민 권한이 없는 사용자가 /admin 접근 시 리디렉션
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }

  // ✅ accessToken 없고 refreshToken만 있는 경우 자동 로그인 처리
  if (!accessToken && refreshToken && !isAutoLoginPage && !isAuthRoute) {
    return NextResponse.redirect(new URL("/refreshLogin", request.url));
  }

  // ✅ 인증된 사용자가 로그인/회원가입 페이지 접근 시 리디렉션
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }

  // ✅ 인증되지 않은 사용자가 보호 페이지 접근 시 로그인 페이지로
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
