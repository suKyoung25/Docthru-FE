"use client";

import { loginAction, registerAction, getServerSideToken } from "@/lib/actions/auth"; // getServerSideToken은 필요에 따라 남겨둡니다.
import { authService } from "@/lib/service/authService";
import { userService } from "@/lib/service/userService"; // userService는 getUser 함수에서 사용

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext({
  login: () => { },
  logout: () => { },
  user: null,
  updateUser: () => { },
  register: () => { },
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
  const [isLoading, setIsLoading] = useState(initialLoading); // 초기 로딩 상태도 props로 받음

  // 사용자 정보를 가져오는 함수 (재활용성을 위해 useCallback 사용)
  // 이 함수는 초기 로딩 시점보다는, 로그인/회원가입 후 또는 새로고침 없이 유저 정보가 업데이트되어야 할 때 주로 사용됩니다.
  const getUser = useCallback(async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      throw error;
    }
  }, []);

  // 사용자 정보 업데이트 함수
  const updateUser = useCallback((newUserData) => {
    setUser(newUserData);
  }, []);

  const register = async (nickname, email, password, passwordConfirmation) => {
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

      // 회원가입 성공 후, 백엔드에서 받은 사용자 정보로 상태 업데이트
      setUser({
        id: responseData.id,
        email: responseData.email,
        nickname: responseData.nickname,
      });
      // 성공적으로 사용자 상태를 업데이트했으므로, 여기서 추가적으로 getUser를 호출할 필요는 없습니다.
      return responseData;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setUser(null);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const responseData = await loginAction(email, password);
      console.log("loginAction 결과 (서버 응답 확인):", responseData);

      if (responseData?.error) {
        throw new Error(responseData.message || "로그인에 실패했습니다.");
      }

      // 로그인 성공 후, 백엔드에서 받은 사용자 정보로 상태 업데이트
      setUser({
        id: responseData.id,
        email: responseData.email,
        nickname: responseData.nickname,
      });
      // 성공적으로 사용자 상태를 업데이트했으므로, 여기서 추가적으로 getUser를 호출할 필요는 없습니다.
      return responseData;
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout(); // 서버 액션을 통해 쿠키 삭제
      setUser(null); // 클라이언트 상태 초기화
      // 로그아웃 후 리다이렉션이 필요한 경우 여기서 처리 (예: useRouter().push('/login'))
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setUser(null);
    }
  };

  // initialUser와 initialLoading을 props로 받기 때문에 useEffect에서 초기 사용자 로딩 로직 제거
  // 하지만, 혹시 모를 상황 (예: 클라이언트에서 직접 페이지 진입 시)을 대비하여
  // 이미 인증된 상태라면 (initialUser가 있다면) isLoading을 false로 설정합니다.
  useEffect(() => {
    // initialUser가 이미 설정되어 있고, 아직 로딩 중이라면 로딩 완료로 처리
    if (initialUser && isLoading) {
      setIsLoading(false);
    }
    // initialUser가 없는데, 페이지 새로고침 시 토큰이 존재할 수 있는 경우를 대비하여
    // 한번 더 getUser를 시도할 수도 있습니다.
    // 하지만 layout.js에서 이미 getUser를 했으므로, 이 부분은 제거하는 것이 더 효율적입니다.
    // 만약 login/signup 페이지를 제외한 다른 페이지에서 AuthProvider가 사용되고
    // 사용자가 직접 URL 입력 등으로 들어온 경우, 여기서 다시 인증 상태를 확인해야 할 수 있습니다.
    // 현재 제안은 layout.js에서 초기 인증을 전담하도록 설계되었습니다.
  }, [initialUser, isLoading]);

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