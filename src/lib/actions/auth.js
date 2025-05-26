'use server'; // 이 파일의 모든 함수가 서버에서 실행됨을 명시

import { cookies } from 'next/headers'; // Next.js의 서버 측 쿠키 접근을 위한 헬퍼 함수

export async function getServerSideToken(cookieName) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(cookieName)?.value;
    console.log(`[getServerSideToken] Fetched '${cookieName}':`, token ? 'Found' : 'Not Found');
    return token;
  } catch (error) {
    console.error(`[getServerSideToken] Error getting '${cookieName}':`, error);
    return undefined;
  }
}

export async function updateAccessToken(newAccessToken) {
  try {
    const cookieStore = cookies();
    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1시간 (백엔드와 일치하도록 설정)
      path: '/',
      sameSite: 'Lax'
    });
    console.log('[updateAccessToken] Access token updated successfully.');
  } catch (error) {
    console.error('[updateAccessToken] Error updating access token:', error);
    throw error;
  }
}

export async function clearServerSideTokens() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    console.log('[clearServerSideTokens] All tokens cleared successfully.');
    return { success: true };
  } catch (error) {
    console.error('[clearServerSideTokens] Error clearing tokens:', error);
    return { error: true, message: error.message };
  }
}

export async function loginAction(email, password) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${baseURL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    });

    // --- 디버깅 로그 부분은 이제 필요 없으므로 제거하거나 주석 처리 ---
    // console.log('--- DEBUG START: loginAction ---');
    // console.log('1. Raw response from loginAction fetch:', response);
    // ...
    // console.log('--- DEBUG END: loginAction ---');
    // --- 디버깅 로그 끝 ---

    if (!response.ok) {
      const errorData = await response.json();
      console.error('로그인 실패 응답:', errorData);
      return { error: true, message: errorData.message || '로그인 실패' };
    }

    const userData = await response.json();

    // 백엔드 응답에서 Set-Cookie 헤더를 가져옵니다.
    // response.headers.get()은 해당 이름의 첫 번째 헤더 값을 문자열로 반환합니다.
    const setCookieHeader = response.headers.get('Set-Cookie');

    if (setCookieHeader) {
      console.log('Backend Set-Cookie header received in loginAction:', setCookieHeader);

      // Next.js의 cookies()를 사용하여 서버 쿠키를 설정합니다.
      // Next.js는 Set-Cookie 헤더의 각 항목을 자동으로 파싱하여 처리하므로,
      // 개별 쿠키 이름을 찾아 수동으로 set 해줍니다.
      // (이때 백엔드에서 보낸 Max-Age, HttpOnly 등의 속성을 그대로 사용합니다.)

      // 백엔드에서 'Set-Cookie' 헤더가 하나의 문자열로 합쳐져 오는 경우,
      // 이를 파싱하여 개별 쿠키를 설정해야 합니다.
      const cookieParts = setCookieHeader.split(', ').flatMap((part) => part.split(',')); // 콤마로 분리
      const cookieStore = cookies(); // 서버 액션에서 cookies() 인스턴스 가져오기

      cookieParts.forEach((cookieString) => {
        const [nameValuePair, ...attributes] = cookieString.split(';').map((s) => s.trim());
        const [name, value] = nameValuePair.split('=');

        // 필요한 속성만 추출하여 설정 (Max-Age, Path, HttpOnly, SameSite, Secure)
        const cookieOptions = {};
        attributes.forEach((attr) => {
          const lowerAttr = attr.toLowerCase();
          if (lowerAttr.startsWith('max-age')) {
            cookieOptions.maxAge = parseInt(attr.split('=')[1], 10);
          } else if (lowerAttr.startsWith('path')) {
            cookieOptions.path = attr.split('=')[1];
          } else if (lowerAttr.startsWith('expires')) {
            cookieOptions.expires = new Date(attr.split('=')[1]);
          } else if (lowerAttr === 'httponly') {
            cookieOptions.httpOnly = true;
          } else if (lowerAttr.startsWith('samesite')) {
            cookieOptions.sameSite = attr.split('=')[1]; // 'Lax' 또는 'Strict'
          } else if (lowerAttr === 'secure') {
            cookieOptions.secure = true;
          }
        });

        if (name && value) {
          cookieStore.set(name, value, cookieOptions);
          console.log(`[loginAction] Set server cookie: ${name}`);
        }
      });
    } else {
      console.warn('No Set-Cookie header received from backend for login.');
    }

    // 백엔드에서 받은 사용자 정보를 클라이언트 컴포넌트로 전달
    return { success: true, user: userData };
  } catch (error) {
    console.error('로그인 액션 오류:', error.message);
    return { error: true, message: error.message || '로그인 중 알 수 없는 오류 발생' };
  }
}

export async function registerAction(nickname, email, password, passwordConfirmation) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${baseURL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
      cache: 'no-store' // 회원가입 요청은 캐싱하지 않음
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('회원가입 실패 응답:', errorData);
      return { error: true, message: errorData.message || '회원가입 실패' };
    }

    const userData = await response.json();
    return { success: true, user: userData };
  } catch (error) {
    console.error('회원가입 액션 오류:', error.message);
    return { error: true, message: error.message || '회원가입 중 알 수 없는 오류 발생' };
  }
}
