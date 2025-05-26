// src/lib/service/authService.js
// tokenFetch는 여기서는 사용되지 않으므로 제거하거나 주석 처리합니다.
import { clearServerSideTokens } from '@/lib/actions/auth'; // logout 함수에서 사용
import { defaultFetch } from '@/lib/fetchClient'; // defaultFetch는 fetchClient.js에 정의되어 있으므로 여기서 import 합니다.

export const authService = {
  // 쿠키 인증을 사용하는 로그인 (이제 loginAction에서 직접 처리)
  // 이 함수는 더 이상 직접 사용되지 않고 loginAction 서버 액션에서 사용됨을 가정합니다.
  // 이 함수를 제거하거나, loginAction이 authService를 직접 호출하지 않도록 authAction으로 fetch 로직을 옮기는 것을 고려하세요.
  // 현재 구조에서는 이 login 함수가 defaultFetch를 호출하고 그 결과를 loginAction이 받습니다.
  login: async (email, password) => {
    try {
      const response = await defaultFetch('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        cache: 'no-store' // 로그인 요청은 캐싱하지 않음
      });
      return response;
    } catch (error) {
      console.error('authService.login API 호출 실패:', error.message);
      throw error;
    }
  },

  // 회원가입 (이제 registerAction에서 직접 처리)
  // 이 함수도 registerAction에서 사용됨을 가정합니다.
  register: async (nickname, email, password, passwordConfirmation) => {
    try {
      const response = await defaultFetch('/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
        cache: 'no-store' // 회원가입 요청은 캐싱하지 않음
      });
      return response;
    } catch (error) {
      console.error('authService.register API 호출 실패:', error.message);
      throw error;
    }
  },

  // 로그아웃 (서버 액션으로 쿠키 삭제 위임)
  logout: async () => {
    try {
      // 클라이언트 컴포넌트에서 호출 시, clearServerSideTokens 서버 액션이 실행됩니다.
      return await clearServerSideTokens();
    } catch (error) {
      console.error('authService.logout 처리 실패 (서버 액션 호출 중):', error);
      throw error;
    }
  }
};
