import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // --- 미들웨어 시작 로그 ---
  console.log(`[Middleware] Request received for: ${pathname}`);
  // ✅ refreshToken 기반 인증 여부 판단 (httpOnly 쿠키는 JS에서는 못 보지만 서버에서는 접근 가능)
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!refreshToken;
  // --- 인증 상태 로그 ---
  console.log(`[Middleware] Is Authenticated (based on refreshToken): ${isAuthenticated}`);
  if (refreshToken) {
    console.log(`[Middleware] Refresh token found (value not logged for security, but presence confirmed).`);
  } else {
    console.log(`[Middleware] No refresh token found.`);
  }
  // ✅ 로그인/회원가입 경로 여부 (인증 상태에 따라 접근 차단 목적)
  const isAuthRoute = pathname.startsWith('/signIn') || pathname.startsWith('/signUp');
  // --- 인증 경로 여부 로그 ---
  console.log(`[Middleware] Is Auth Route (${pathname}): ${isAuthRoute}`);
  // ✅ 보호할 개별 정규 경로 조건: /blogs/[id]/edit 형식
  const isEditRoute = /^\/blogs\/[0-9]+\/edit$/.test(pathname);
  // --- 편집 경로 여부 로그 ---
  console.log(`[Middleware] Is Edit Route (${pathname}): ${isEditRoute}`);
  // ✅ 완전 일치 기반 보호 경로들 (추후 prefix 기반 보호가 필요하면 startsWith로 변경 가능)
  // work/create는 includes로 변경
  const protectedRoutes = ['/challenges/create', '/work/create'];
  // ✅ 보호되어야 하는 전체 경로 판단
  const isProtectedRoute = protectedRoutes.includes(pathname) || isEditRoute;
  // --- 보호 경로 여부 로그 ---
  console.log(`[Middleware] Is Protected Route (${pathname}): ${isProtectedRoute}`);
  // --- 조건별 리디렉션 판단 시작 ---
  // ✅ 인증된 사용자가 로그인/회원가입 페이지에 접근하면 → 리디렉션 (불필요한 접근 방지)
  if (isAuthRoute && isAuthenticated) {
    console.log(`[Middleware] Condition met: Authenticated user on auth route. Redirecting to /challenges.`);
    return NextResponse.redirect(new URL('/challenges', request.url));
  }
  // ✅ 인증되지 않은 사용자가 보호 페이지 접근 시 → 로그인 페이지로 리디렉션
  if (isProtectedRoute && !isAuthenticated) {
    console.log(`[Middleware] Condition met: Unauthenticated user on protected route. Redirecting to /signIn.`);
    return NextResponse.redirect(new URL('/signIn', request.url));
  }
  // ✅ 그 외 모든 경우는 요청 계속 진행
  console.log(`[Middleware] No redirect conditions met. Continuing request.`);
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
