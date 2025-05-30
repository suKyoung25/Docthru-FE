import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthenticated = !!refreshToken;

  const isAuthRoute = pathname.startsWith("/signIn") || pathname.startsWith("/signUp");
  const isProtectedRoute = pathname.startsWith("/challenges") || pathname.startsWith("/admin");

  // ✅ 자동 로그인 처리를 위한 전용 페이지 (/auth/refresh-login)에서는 미들웨어 로직 제외
  const isAutoLoginPage = pathname.startsWith("/refreshLogin");

  // ✅ accessToken 없고 refreshToken만 있는 경우 자동 로그인 처리 페이지로 리디렉션
  if (!accessToken && refreshToken && !isAutoLoginPage && !isAuthRoute) {
    return NextResponse.redirect(new URL("/refreshLogin", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
