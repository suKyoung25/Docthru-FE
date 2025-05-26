// src/lib/fetchClient.js
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

/**
 * 토큰 인증 fetch 클라이언트
 * 이 함수도 항상 HTTP `Response` 객체 자체를 반환합니다.
 * 401 에러 시 토큰 갱신 및 재시도 로직을 포함합니다.
 */
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
    cache: 'no-store', // 서버 컴포넌트에서도 매번 재검증
    ...options // 나머지 옵션은 덮어쓸 수 있도록
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도 (리프레시 토큰 요청은 제외)
  if (response.status === 401 && url !== '/auth/refresh-token') {
    console.warn('Access token expired or invalid, attempting to refresh token...');
    try {
      const refreshToken = await getServerSideToken('refreshToken'); // 서버 사이드에서 리프레시 토큰 가져오기

      if (!refreshToken) {
        console.error('Refresh token not found. Logging out.');
        await clearServerSideTokens(); // 리프레시 토큰 없으면 로그아웃 (서버 액션)
        throw new Error('리프레시 토큰이 없습니다. 다시 로그인 해주세요.');
      }

      // 토큰 갱신 요청
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
          // 새로 발급받은 액세스 토큰을 서버 쿠키에 업데이트 (서버 액션 호출)
          await updateAccessToken(newAccessToken);

          // 새로 발급받은 액세스 토큰으로 헤더 업데이트
          mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;

          // 원래 요청 재시도
          console.log('Token refreshed successfully. Retrying original request...');
          response = await fetch(`${baseURL}${url}`, mergedOptions);
        } else {
          console.error('새 액세스 토큰을 받지 못했습니다. 로그아웃합니다.');
          await clearServerSideTokens();
          throw new Error('새 액세스 토큰 발급 실패. 다시 로그인해주세요.');
        }
      } else {
        const errorData = await refreshResponse.json();
        console.error('토큰 갱신 실패:', errorData.message || refreshResponse.statusText);
        await clearServerSideTokens(); // 모든 토큰 삭제 (강제 로그아웃)
        throw new Error('인증 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    } catch (error) {
      console.error('토큰 리프레시 및 재시도 중 오류 발생:', error.message);
      await clearServerSideTokens();
      throw new Error(`인증 오류: ${error.message}. 다시 로그인 해주세요.`);
    }
  }

  return response;
};
