import { getServerSideToken, clearServerSideTokens, updateAccessToken } from '@/lib/actions/auth'; // 서버 액션 임포트

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache' // 기본 캐싱 활성화
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

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      errorData.message = `HTTP error! Status: ${response.status} - ${response.statusText}`;
    }
    throw new Error(errorData.message || `API 호출 실패: ${url} (상태 코드: ${response.status})`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return { status: response.status, ok: response.ok, message: 'No content' };
};

/**
 * 토큰 인증 fetch 클라이언트
 */
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  // getServerSideToken을 사용하여 서버 사이드에서 쿠키에 접근
  let accessToken = await getServerSideToken('accessToken');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}` // 초기 액세스 토큰 사용
    },
    cache: 'no-store' // 서버 컴포넌트에서도 매번 재검증
  };

  let mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (response.status === 401 && url !== '/auth/refresh') {
    console.warn('Access token expired or invalid, attempting to refresh token...');
    try {
      const refreshToken = await getServerSideToken('refreshToken'); // 서버 사이드에서 리프레시 토큰 가져오기

      if (!refreshToken) {
        console.error('Refresh token not found. Logging out.');
        await clearServerSideTokens(); // 리프레시 토큰 없으면 로그아웃 (서버 액션)
        throw new Error('리프레시 토큰이 없습니다. 다시 로그인 해주세요.');
      }

      // 토큰 갱신 요청
      const refreshResponse = await fetch(`${baseURL}/auth/refresh`, {
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
        // 새 리프레시 토큰은 백엔드에서 Set-Cookie로 보내므로 여기서 직접 받을 필요는 없습니다.
        // 하지만 만약 백엔드가 새 리프레시 토큰도 응답 본문에 준다면 처리할 수 있습니다.
        // 여기서는 새 액세스 토큰만 본문으로 받는다고 가정하고 updateAccessToken 호출합니다.

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

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      errorData.message = `HTTP error! Status: ${response.status} - ${response.statusText}`;
    }
    throw new Error(errorData.message || `API 호출 실패: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return { status: response.status, ok: response.ok, message: 'No content' };
};
