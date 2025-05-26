import { tokenFetch } from '@/lib/fetchClient';
import { logoutAction } from '@/lib/actions/auth';

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
      await logoutAction();
      throw error;
    }
  }
};
