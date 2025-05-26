"use client";

// getServerSideToken은 클라이언트 컴포넌트에서 직접 사용하지 않으므로 제거하거나 주석 처리합니다.
// loginAction, registerAction은 클라이언트에서 호출할 서버 액션입니다.
import { loginAction, registerAction, clearServerSideTokens } from "@/lib/actions/auth";
// authService와 userService는 이제 서버 액션 대신 직접 백엔드 API를 호출하거나,
// 서버 액션이 담당할 수 없는 클라이언트 측 로직에만 사용되어야 합니다.
// 현재 authService의 logout 함수가 clearServerSideTokens를 호출하고 있으므로
// authService 임포트는 유지하고, userService는 getUser에서 사용.
import { authService } from "@/lib/service/authService";
import { userService } from "@/lib/service/userService";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation"; // 로그아웃 후 리다이렉션을 위해 useRouter 임포트

const AuthContext = createContext({
  user: null,
  isLoading: true, // 기본 로딩 상태를 true로 설정
  login: () => { },
  logout: () => { },
  register: () => { },
  updateUser: () => { },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// initialUser와 initialLoading을 props로 받도록 변경
export default function AuthProvider({ children, initialUser, initialLoading }) {
  const [user, setUser] = useState(initialUser);
  // initialLoading은 layout에서 false로 넘어오므로, isLoading 초기값은 false가 됩니다.
  const [isLoading, setIsLoading] = useState(initialLoading);
  const router = useRouter();

  // 사용자 정보를 가져오는 함수 (재활용성을 위해 useCallback 사용)
  // 이 함수는 초기 로딩 시점보다는, 로그인/회원가입 후 또는 새로고침 없이 유저 정보가 업데이트되어야 할 때 주로 사용됩니다.
  const getUser = useCallback(async () => {
    try {
      const userData = await userService.getMe(); // tokenFetch를 통해 인증된 요청 수행
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      // 토큰 만료 등으로 실패한 경우, 로그아웃 처리 및 로그인 페이지로 리다이렉트
      // await clearServerSideTokens(); // 이미 userService.getMe 내부에서 처리될 수 있음
      router.push('/login');
      throw error;
    }
  }, [router]);


  // 사용자 정보 업데이트 함수
  const updateUser = useCallback((newUserData) => {
    setUser(newUserData);
  }, []);

  const register = async (nickname, email, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      const responseData = await registerAction(
        nickname,
        email,
        password,
        passwordConfirmation
      );

      if (responseData?.error) {
        throw new Error(responseData.message || "회원가입에 실패했습니다.");
      }

      setUser(responseData.user);
      // 회원가입 성공 후에도 서버 컴포넌트가 새로운 쿠키를 읽도록 트리거
      router.refresh(); // 매우 중요!
      router.push('/blogs'); // 리다이렉션

      return responseData;
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
      const responseData = await loginAction(email, password);
      console.log("loginAction 결과 (서버 응답 확인):", responseData);

      if (responseData?.error) {
        throw new Error(responseData.message || "로그인에 실패했습니다.");
      }

      setUser(responseData.user);
      // 로그인 성공 후, router.refresh()를 호출하여 서버 컴포넌트(layout.js)가
      // 새로운 쿠키를 포함한 요청으로 다시 렌더링되도록 트리거합니다.
      router.refresh(); // 매우 중요!
      router.push('/blogs'); // 리다이렉션

      return responseData;
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await clearServerSideTokens(); // 서버 액션을 통해 쿠키 삭제 (authService.logout이 이 함수를 호출하므로 직접 호출해도 됨)
      setUser(null); // 클라이언트 상태 초기화
      router.push('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setUser(null);
      router.push('/login'); // 에러 발생 시에도 로그인 페이지로 리다이렉트
    } finally {
      setIsLoading(false);
    }
  };

  // initialUser와 initialLoading을 props로 받기 때문에 useEffect에서 초기 사용자 로딩 로직 제거
  useEffect(() => {
    // layout.js에서 initialUser와 initialLoading을 받아오므로,
    // 이 useEffect는 주로 user 상태가 변경될 때 추가적인 작업을 수행하는 용도로 사용됩니다.
    // 예를 들어, user 객체가 null이 되면 특정 상태를 초기화하는 등의 로직.
    if (initialUser && isLoading) {
      setIsLoading(false); // 초기 로딩 상태는 layout에서 결정되므로 한 번만 처리
    }
  }, [initialUser, isLoading]);

  // 로딩 상태에 따라 스피너 렌더링
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}