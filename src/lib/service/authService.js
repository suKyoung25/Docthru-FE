import { clearServerSideTokens } from '@/lib/actions/auth';
import { defaultFetch } from '@/lib/fetchClient';

export const authService = {
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
