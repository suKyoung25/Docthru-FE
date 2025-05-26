'use server'; // Server Action 파일에 import 되므로 'use server' 필요

import { getServerSideToken, clearServerSideTokens, updateAccessToken } from '@/lib/actions/auth'; // 서버 액션 임포트

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 * 이 함수는 항상 HTTP `Response` 객체 자체를 반환합니다.
 * 응답의 성공 여부 (.ok) 확인 및 본문 파싱은 이 함수를 호출하는 측(예: authService)에서 수행합니다.
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL; // .env.local 또는 .env 파일에 정의
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // 기본적으로 캐싱하지 않음 (요청마다 새로운 데이터 보장)
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);
  return response;
};

export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  let accessToken = await getServerSideToken('accessToken'); // 서버 사이드에서 액세스 토큰 가져오기

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }) // 액세스 토큰이 있으면 추가
  };

  let mergedOptions = {
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    cache: 'no-store',
    ...options
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401 && url !== '/auth/refresh-token') {
    console.warn('Access token expired or invalid, attempting to refresh token...');
    try {
      const refreshToken = await getServerSideToken('refreshToken');
      console.log('Fetched refreshToken from cookies:', refreshToken); // 디버깅용 로그

      if (!refreshToken) {
        console.error('Refresh token not found. Throwing error to trigger logout.');
        // clearServerSideTokens() 호출 제거
        throw new Error('리프레시 토큰이 없습니다. 다시 로그인 해주세요.');
      }

      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store'
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.accessToken;

        if (newAccessToken) {
          await updateAccessToken(newAccessToken); // Access token 설정은 서버 액션이므로 OK
          mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;
          response = await fetch(`<span class="math-inline">\{baseURL\}</span>{url}`, mergedOptions);
        } else {
          console.error('새 액세스 토큰을 받지 못했습니다. Throwing error to trigger logout.');
          // clearServerSideTokens() 호출 제거
          throw new Error('새 액세스 토큰 발급 실패. 다시 로그인해주세요.');
        }
      } else {
        const errorData = await refreshResponse.json();
        console.error('토큰 갱신 실패:', errorData.message || refreshResponse.statusText);
        // clearServerSideTokens() 호출 제거
        throw new Error('인증 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    } catch (error) {
      console.error('토큰 리프레시 및 재시도 중 오류 발생:', error.message);
      // clearServerSideTokens() 호출 제거
      // 중요: 여기서 에러를 다시 던져서 userService.getMe에서 처리하도록 합니다.
      throw new Error(`인증 오류: ${error.message}. 다시 로그인 해주세요.`);
    }
  }

  return response;
};
