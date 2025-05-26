// import { defaultFetch, tokenFetch } from '@/lib/fetchClient'; // tokenFetch는 여기서는 사용되지 않음
import { clearServerSideTokens } from '../actions/auth';
import { defaultFetch } from '@/lib/fetchClient'; // defaultFetch는 fetchClient.js에 정의되어 있으므로 여기서 import 합니다.

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  login: async (email, password) => {
    try {
      const response = await defaultFetch('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        cache: 'no-store' // 로그인 요청은 캐싱하지 않음
      });
      // 백엔드가 Set-Cookie 헤더로 토큰을 보내므로, 여기서 추가 작업 필요 없음
      return response; // 응답 본문 (사용자 정보) 반환
    } catch (error) {
      console.error('로그인 API 호출 실패:', error.message);
      throw error;
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
      // 백엔드가 Set-Cookie 헤더로 토큰을 보내므로, 여기서 추가 작업 필요 없음
      return response; // 응답 본문 (사용자 정보) 반환
    } catch (error) {
      console.error('회원가입 API 호출 실패:', error.message);
      throw error;
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
