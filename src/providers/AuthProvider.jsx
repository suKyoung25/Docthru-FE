// providers/AuthProvider.js
"use client";

import { loginAction, registerAction, getUserAction, logoutAction } from "@/lib/actions/auth"; // Server Actions만 import
import { createContext, useContext, useEffect, useState } from "react";

// ✅ 이 setTokensToCookie 함수는 이제 필요 없으므로 제거합니다.
//    백엔드가 HttpOnly 쿠키를 직접 설정하기 때문에, 클라이언트 JavaScript는
//    이 쿠키에 접근할 수도 없고 직접 설정할 필요도 없습니다.

const AuthContext = createContext({
  login: () => { },
  logout: () => { },
  user: null,
  updateUser: () => { }, // 이 함수가 AuthProvider 내부에서 사용되지 않으면 제거를 고려할 수 있습니다.
  register: () => { },
  isLoading: true, // 초기값 설정
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

  // getUser는 Server Action인 getUserAction을 호출합니다.
  const getUser = async () => {
    try {
      const userData = await getUserAction(); // Server Action 호출!
      console.log('AuthProvider - getUser received:', userData);
      setUser(userData || null); // null/undefined 방지
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    try {
      const result = await registerAction( // Server Action 호출
        nickname,
        email,
        password,
        passwordConfirmation,
      );
      console.log('AuthProvider - register result:', result);

      // ✅ registerAction에서 이미 서버 쿠키에 토큰을 저장했으므로,
      //    클라이언트에서 setTokensToCookie를 호출하거나 토큰 유무를 확인할 필요가 없습니다.
      //    `result?.accessToken`과 `result?.refreshToken`은 loginAction에서 반환하는 더미 값입니다.

      setUser(result?.user || null); // 사용자 정보만 상태 업데이트
      return result?.user || null;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await loginAction(email, password); // Server Action 호출
      console.log('AuthProvider - login result:', result);

      // ✅ loginAction에서 이미 서버 쿠키에 토큰을 저장했으므로,
      //    클라이언트에서 setTokensToCookie를 호출하거나 토큰 유무를 확인할 필요가 없습니다.
      //    `result?.accessToken`과 `result?.refreshToken`은 loginAction에서 반환하는 더미 값입니다.

      setUser(result?.user || null); // 사용자 정보만 상태 업데이트
      return result?.user || null;
    } catch (error) {
      console.error("로그인 실패:", error);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAction(); // Server Action 호출
      setUser(null); // 사용자 상태 초기화
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 초기 사용자 정보 로딩 로직 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    async function fetchInitialUser() {
      await getUser(); // 서버에서 사용자 정보 가져오기 시도
      setIsLoading(false); // 로딩 완료
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