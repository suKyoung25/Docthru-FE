// src/lib/service/userService.js
import { tokenFetch } from '@/lib/fetchClient';

export const userService = {
  // 사용자 정보 요청
  getMe: async () => {
    try {
      const response = await tokenFetch('/users/me');
      if (!response.ok) {
        // 401 에러 등 인증 실패 시 tokenFetch에서 이미 로그아웃 처리 및 에러 throw
        // 여기서는 그 외의 HTTP 에러 처리
        const errorData = await response.json();
        throw new Error(errorData.message || '사용자 정보 로드 실패');
      }
      return await response.json();
    } catch (error) {
      console.error('userService.getMe 실패:', error);
      throw error; // AuthProvider에서 이 에러를 받아서 처리합니다.
    }
  }
};
