// lib/api/authService.js
// 이 파일은 이제 클라이언트 사이드에서만 사용되거나, 완전히 제거될 수도 있습니다.
// Server Actions에서 fetch를 직접 사용하므로, 이 파일의 login, register 함수는 사용되지 않습니다.

import { defaultFetch, tokenFetch } from '@/lib/fetchClient';
// import { clearServerSideTokens } from '../actions/auth'; // Server Action은 클라이언트에서 직접 호출 불가

export const authService = {
  // getMe: () => tokenFetch('/users/me'), // ✅ 이 함수는 이제 getUserAction으로 대체될 것입니다.
  //    만약 클라이언트에서 'Authorization' 헤더에 토큰을 포함하여
  //    API를 호출할 필요가 있다면 유지할 수 있습니다.

  // login: (email, password) => // ✅ 이 함수는 이제 loginAction(Server Action)으로 대체됩니다.
  //   defaultFetch('/auth/sign-in', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     cache: 'no-store'
  //   }),

  // register: (nickname, email, password, passwordConfirmation) => // ✅ 이 함수도 registerAction으로 대체됩니다.
  //   defaultFetch('/auth/sign-up', {
  //     method: 'POST',
  //     body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
  //     cache: 'no-store'
  //   }),

  // ✅ [수정] logout: 클라이언트에서 쿠키 삭제.
  //    authService.logout()을 `logoutAction` (Server Action)으로 대체하는 것이 더 좋습니다.
  //    만약 클라이언트에서 특정 API 호출 없이 단순히 쿠키만 지우는 것이라면 이 함수를 유지할 수 있습니다.
  //    하지만 보통 백엔드에도 로그아웃 요청을 보내 세션 파기 등을 합니다.
  //    이전 코드의 clearServerSideTokens 호출은 클라이언트에서 Server Action을 호출하는 것이므로 오류가 납니다.
  logout: () => {
    // 클라이언트에서 document.cookie를 통해 쿠키 삭제 (httpOnly 쿠키는 삭제 불가)
    // 이 경우, httpOnly 쿠키는 서버 측에서만 삭제 가능합니다.
    // 따라서, authService.logout 대신 auth/actions.js의 logoutAction을 사용하는 것을 권장합니다.
    console.warn('Consider using logoutAction from Server Actions for clearing httpOnly cookies.');
    document.cookie = 'accessToken=; path=/; max-age=0; SameSite=Strict; Secure';
    document.cookie = 'refreshToken=; path=/; max-age=0; SameSite=Strict; Secure';
    return { success: true };
  }
};
