'use server';

import { cookies } from 'next/headers';

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

// 리프레쉬 토큰 로직
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('로그인 실패 응답:', errorData);
      return { error: true, message: errorData.message || '로그인 실패' };
    }

    const userData = await response.json();

    const setCookieHeader = response.headers.get('Set-Cookie');

    if (setCookieHeader) {
      console.log('Backend Set-Cookie header received in loginAction:', setCookieHeader);

      const cookieParts = setCookieHeader.split(', ').flatMap((part) => part.split(','));
      const cookieStore = cookies();

      cookieParts.forEach((cookieString) => {
        const [nameValuePair, ...attributes] = cookieString.split(';').map((s) => s.trim());
        const [name, value] = nameValuePair.split('=');

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
            cookieOptions.sameSite = attr.split('=')[1];
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
      cache: 'no-store'
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

export async function logoutAction() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    console.log('[logoutAction] All tokens cleared successfully via logoutAction.');
    return { success: true };
  } catch (error) {
    console.error('[logoutAction] Error clearing tokens in logoutAction:', error);
    return { error: true, message: error.message };
  }
}
