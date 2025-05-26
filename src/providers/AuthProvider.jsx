"use client";

import { loginAction, registerAction } from "@/lib/actions/auth";
import { userService } from "@/lib/service/userService";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/service/authService";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  user: null
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const register = async (nickname, email, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      const userData = await registerAction(nickname, email, password, passwordConfirmation);

      if (userData?.error) {
        throw new Error(userData.message || "회원가입에 실패했습니다.");
      }
      setUser(userData.user);
      return userData;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await loginAction(email, password);
      console.log("loginAction 결과 (서버 응답 확인):", userData);

      if (userData?.error) {
        throw new Error(userData.message || "로그인에 실패했습니다.");
      }
      getUser();
      router.push("/signIn");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/signIn");
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>;
}
