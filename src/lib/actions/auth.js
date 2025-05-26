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
      cache: 'no-store' // 로그인 요청은 캐싱하지 않음
    });

    // --- 강력한 디버깅 로그 ---
    console.log('--- DEBUG START: loginAction ---');
    console.log('1. Raw response from loginAction fetch:', response);
    console.log('2. Is response an instance of global Response?', response instanceof Response);
    console.log('3. Type of response:', typeof response);
    console.log('4. Does response have .headers property?', 'headers' in response);
    if (response && 'headers' in response) {
      console.log('5. Type of response.headers:', typeof response.headers);
      console.log(
        '6. Does response.headers have .getAll method?',
        'getAll' in response.headers && typeof response.headers.getAll === 'function'
      );
      if (response.headers && typeof response.headers.getAll === 'function') {
        console.log("7. Attempting to call response.headers.getAll('Set-Cookie')...");
        const setCookieHeaders = response.headers.getAll('Set-Cookie');
        console.log('Set-Cookie Headers from login response:', setCookieHeaders);
      } else {
        console.error('8. CRITICAL: response.headers.getAll is NOT a function before actual call!');
      }
    } else {
      console.error("9. CRITICAL: 'headers' property missing or response is not an object!");
    }
    console.log('--- DEBUG END: loginAction ---');
    // --- 디버깅 로그 끝 ---

    if (!response.ok) {
      const errorData = await response.json();
      console.error('로그인 실패 응답:', errorData);
      return { error: true, message: errorData.message || '로그인 실패' };
    }

    const userData = await response.json();
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
