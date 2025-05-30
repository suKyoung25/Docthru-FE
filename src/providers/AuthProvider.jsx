"use client";

import { getRefreshToken, loginAction, logoutAction, registerAction } from "@/lib/actions/auth";
import { userService } from "@/lib/service/userService";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  autoLogin: () => {},
  user: null,
  isLoading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshTokenTimer = useRef(null);

  const startRefreshTokenTimer = (minutes) => {
    if (refreshTokenTimer.current) clearInterval(refreshTokenTimer.current);

    refreshTokenTimer.current = setInterval(
      async () => {
        const data = await getRefreshToken();
        console.log("🔄 자동 갱신:", data);
        if (data?.error) {
          await logout();
        }
      },
      minutes * 60 * 1000
    );
  };

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      throw error;
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      const userData = await registerAction(email, nickname, password, passwordConfirmation);
      if (userData?.error) {
        console.log(userData);
        return userData;
      }
      return userData;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await loginAction(email, password);

      if (userData?.error) {
        throw new Error(userData.message || "로그인에 실패했습니다.");
      }

      // 토큰 갱신 로직을 주기적으로 실행
      // JWT 슬라이딩 세션 트리거 파트
      startRefreshTokenTimer(1);

      await getUser();
      router.push("/challenges");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const autoLogin = async () => {
    setIsLoading(true);
    try {
      // 먼저 토큰 갱신을 시도하고 성공하기를 기다림
      const refreshResult = await getRefreshToken();
      if (refreshResult?.error) {
        throw new Error("토큰 갱신 실패");
      }

      // 토큰 갱신 성공 후 타이머 시작
      startRefreshTokenTimer(1);

      // 이제 유저 정보 조회
      await getUser();
      router.push("/challenges");
    } catch (error) {
      console.error("자동 로그인 실패:", error);
      router.push("/signIn");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.push("/signIn");
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const excludeRoutes = ["/", "/signIn", "/signUp", "/refreshLogin"];

    if (!excludeRoutes.includes(pathname)) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout, autoLogin, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
