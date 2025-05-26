// services/authService.js
// import { defaultFetch, tokenFetch } from '@/lib/fetchClient'; // tokenFetch는 여기서는 사용되지 않음
import { clearServerSideTokens } from '@/lib/actions/auth'; // logout 함수에서 사용

// defaultFetch는 fetchClient.js에 정의되어 있으므로 여기서 import 합니다.
// defaultFetch는 Response 객체를 그대로 반환하는 fetch 래퍼 함수여야 합니다.
import { defaultFetch } from '@/lib/fetchClient';

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  login: async (email, password) => {
    try {
      const response = await defaultFetch('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        cache: 'no-store' // 로그인 요청은 캐싱하지 않음
      });
      // 백엔드가 Set-Cookie 헤더로 토큰을 보내므로,
      // 이 `response` 객체를 `loginAction`에서 받아 `Set-Cookie` 헤더를 처리합니다.
      return response; // 응답 본문이 아닌, fetch `Response` 객체 자체를 반환합니다.
    } catch (error) {
      console.error('로그인 API 호출 실패:', error.message);
      throw error; // 에러는 상위 호출자(loginAction)로 던집니다.
    }
  },

  // 회원가입
  register: async (nickname, email, password, passwordConfirmation) => {
    try {
      const response = await defaultFetch('/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
        cache: 'no-store' // 회원가입 요청은 캐싱하지 않음
      });
      // 백엔드가 Set-Cookie 헤더로 토큰을 보내므로,
      // 이 `response` 객체를 `registerAction`에서 받아 `Set-Cookie` 헤더를 처리합니다.
      return response; // 응답 본문이 아닌, fetch `Response` 객체 자체를 반환합니다.
    } catch (error) {
      console.error('회원가입 API 호출 실패:', error.message);
      throw error; // 에러는 상위 호출자(registerAction)로 던집니다.
    }
  },

  // 로그아웃 (서버 액션으로 쿠키 삭제 위임)
  logout: async () => {
    try {
      // 서버 액션인 clearServerSideTokens만 호출하여 쿠키 삭제를 중앙화
      return await clearServerSideTokens();
    } catch (error) {
      console.error('로그아웃 처리 실패 (서버 액션 호출 중):', error);
      throw error;
    }
  }
};
