import { defaultFetch, tokenFetch } from '@/lib/fetchClient';

export const authService = {
  logout: () => {
    console.warn('Consider using logoutAction from Server Actions for clearing httpOnly cookies.');
    document.cookie = 'accessToken=; path=/; max-age=0; SameSite=None;';
    document.cookie = 'refreshToken=; path=/; max-age=0; SameSite=None;';
    return { success: true };
  }
};
