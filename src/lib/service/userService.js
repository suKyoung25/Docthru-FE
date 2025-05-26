// src/lib/service/userService.js
import { tokenFetch } from '@/lib/fetchClient';
import { logoutAction } from '@/lib/actions/auth'; // logoutAction 임포트

export const userService = {
  async getMe() {
    try {
      const response = await tokenFetch('/users/me');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('userService.getMe 실패:', error.message);
      // 여기서 logoutAction을 호출합니다. (이 함수는 서버 액션이므로 쿠키 수정 가능)
      await logoutAction();
      throw error; // 에러를 다시 던져서 RootLayout에서 처리하도록 합니다.
    }
  }
};
