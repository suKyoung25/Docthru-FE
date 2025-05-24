"use client";

import { loginAction, registerAction, getUserAction, logoutAction } from "@/lib/actions/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => { },
  logout: () => { },
  user: null,
  updateUser: () => { },
  register: () => { },
  isLoading: true,
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

  const getUser = async () => {
    try {
      const userData = await getUserAction();
      console.log('AuthProvider - getUser received:', userData);
      setUser(userData || null);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    try {
      const result = await registerAction(
        nickname,
        email,
        password,
        passwordConfirmation,
      );
      console.log('AuthProvider - register result:', result);
      setUser(result?.user || null);
      return result?.user || null;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await loginAction(email, password);
      console.log('AuthProvider - login result:', result);

      setUser(result?.user || null);
      return result?.user || null;
    } catch (error) {
      console.error("로그인 실패:", error);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    async function fetchInitialUser() {
      await getUser();
      setIsLoading(false);
    }
    fetchInitialUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}