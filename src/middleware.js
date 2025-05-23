import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ refreshToken 기반 인증 여부 판단 (httpOnly 쿠키는 JS에서는 못 보지만 서버에서는 접근 가능)
  // 개발환경에서도 실제 쿠키를 확인하도록 변경
  const isAuthenticated = !!request.cookies.get('refreshToken')?.value;
  // 또는 좀 더 명확하게:
  // const refreshToken = request.cookies.get('refreshToken')?.value;
  // const isAuthenticated = !!refreshToken;

  // ✅ 로그인/회원가입 경로 여부 (인증 상태에 따라 접근 차단 목적)
  const isAuthRoute = pathname.startsWith('/signIn') || pathname.startsWith('/signUp');

  // ✅ 보호할 개별 정규 경로 조건: /blogs/[id]/edit 형식
  const isEditRoute = /^\/blogs\/[0-9]+\/edit$/.test(pathname);

  // ✅ 완전 일치 기반 보호 경로들 (추후 prefix 기반 보호가 필요하면 startsWith로 변경 가능)
  const protectedRoutes = ['/challenges/create', '/work/create'];

  // ✅ 보호되어야 하는 전체 경로 판단
  const isProtectedRoute = protectedRoutes.includes(pathname) || isEditRoute;

  // ✅ 인증된 사용자가 로그인/회원가입 페이지에 접근하면 → 리디렉션 (불필요한 접근 방지)
  if (isAuthRoute && isAuthenticated) {
    // 이미 로그인되어 있으니 로그인/회원가입 페이지가 아닌 /challenges 로 리디렉션
    return NextResponse.redirect(new URL('/challenges', request.url));
  }

  // ✅ 인증되지 않은 사용자가 보호 페이지 접근 시 → 로그인 페이지로 리디렉션
  if (isProtectedRoute && !isAuthenticated) {
    // 보호된 페이지인데 로그인 안 되어 있으면 로그인 페이지로
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  // ✅ 그 외 모든 경우는 요청 계속 진행
  return NextResponse.next();
}

// ✅ 정적 파일이나 API 경로 제외하고 미들웨어 실행할 페이지 정의
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
