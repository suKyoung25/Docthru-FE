import { getRefreshToken, loginAction, logoutAction, registerAction } from "@/lib/actions/auth";

export const authService = {
  // 로그인
  login: async (email, password) => {
    return await loginAction(email, password);
  },

  // 회원가입
  register: async (nickname, email, password, passwordConfirmation) => {
    return await registerAction(email, nickname, password, passwordConfirmation);
  },

  // 로그아웃
  logout: async () => {
    return await logoutAction();
  },

  // 토큰 갱신
  refresh: async () => {
    return await getRefreshToken();
  }
};
