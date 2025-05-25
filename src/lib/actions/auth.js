'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function loginAction(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Action login error response:', errorData);
      throw new Error(errorData.message || '로그인 실패: 서버 응답 오류');
    }

    const setCookieHeaders = response.headers.getSetCookie();
    console.log('[loginAction] Received Set-Cookie headers from backend:', setCookieHeaders);

    const cookieStore = cookies();

    setCookieHeaders.forEach((cookieString) => {
      const parts = cookieString.split(';');
      const [nameValue] = parts[0].split('=');
      const name = nameValue;
      const value = parts[0].substring(name.length + 1);

      const cookieOptions = {};
      parts.slice(1).forEach((part) => {
        const trimmedPart = part.trim();
        if (trimmedPart.toLowerCase() === 'httponly') {
          cookieOptions.httpOnly = true;
        } else if (trimmedPart.toLowerCase() === 'secure') {
          cookieOptions.secure = true;
        } else if (trimmedPart.toLowerCase().startsWith('samesite')) {
          cookieOptions.sameSite = trimmedPart.split('=')[1];
        } else if (trimmedPart.toLowerCase().startsWith('path')) {
          cookieOptions.path = trimmedPart.split('=')[1];
        } else if (trimmedPart.toLowerCase().startsWith('max-age')) {
          cookieOptions.maxAge = parseInt(trimmedPart.split('=')[1], 10);
        }
      });

      cookieStore.set(name, value, cookieOptions);
      console.log(`[loginAction] Setting Next.js cookie: ${name} with options`, cookieOptions);
    });

    const userDataFromBody = await response.json();
    return { user: userDataFromBody };
  } catch (error) {
    console.error('Error in loginAction (Server Action):', error);
    throw error;
  }
}

export async function registerAction(nickname, email, password, passwordConfirmation) {
  try {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
      cache: 'no-store',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Action register error response:', errorData);
      throw new Error(errorData.message || '회원가입 실패: 서버 응답 오류');
    }

    const setCookieHeaders = response.headers.getSetCookie();
    console.log('[registerAction] Received Set-Cookie headers from backend:', setCookieHeaders);

    const cookieStore = cookies();

    setCookieHeaders.forEach((cookieString) => {
      const parts = cookieString.split(';');
      const [nameValue] = parts[0].split('=');
      const name = nameValue;
      const value = parts[0].substring(name.length + 1);

      const cookieOptions = {};
      parts.slice(1).forEach((part) => {
        const trimmedPart = part.trim();
        if (trimmedPart.toLowerCase() === 'httponly') {
          cookieOptions.httpOnly = true;
        } else if (trimmedPart.toLowerCase() === 'secure') {
          cookieOptions.secure = true;
        } else if (trimmedPart.toLowerCase().startsWith('samesite')) {
          cookieOptions.sameSite = trimmedPart.split('=')[1];
        } else if (trimmedPart.toLowerCase().startsWith('path')) {
          cookieOptions.path = trimmedPart.split('=')[1];
        } else if (trimmedPart.toLowerCase().startsWith('max-age')) {
          cookieOptions.maxAge = parseInt(trimmedPart.split('=')[1], 10);
        }
      });
      cookieStore.set(name, value, cookieOptions);
      console.log(`[registerAction] Setting Next.js cookie: ${name} with options`, cookieOptions);
    });

    const userDataFromBody = await response.json();
    return { user: userDataFromBody };
  } catch (error) {
    console.error('Error in registerAction (Server Action):', error);
    throw error;
  }
}

export async function getServerSideToken(type) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  const decodeToken = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      return JSON.parse(Buffer.from(parts[1], 'base64').toString());
    } catch (e) {
      return {};
    }
  };

  const calculateMaxAge = (tokenData) => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return tokenData.exp && tokenData.exp > nowInSeconds
      ? Math.max(0, tokenData.exp - nowInSeconds)
      : 60 * 60 * 24 * 30;
  };

  const accessTokenData = decodeToken(accessToken);
  const refreshTokenData = decodeToken(refreshToken);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: calculateMaxAge(accessTokenData),
    sameSite: 'Lax',
    httpOnly: true
  });

  cookieStore.set('refreshToken', refreshToken, {
    path: '/',
    maxAge: calculateMaxAge(refreshTokenData),
    sameSite: 'Lax',
    httpOnly: true
  });
}

export async function updateAccessToken(accessToken) {
  const cookieStore = await cookies();
  try {
    const accessTokenData = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      maxAge: Math.max(0, accessTokenExpiresIn),
      sameSite: 'Lax',
      httpOnly: true
    });
  } catch (error) {
    console.error('Error updating access token:', error);
  }
}

export async function clearServerSideTokens() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return { success: true };
}

export async function getUserAction() {
  try {
    const accessToken = await getServerSideToken('accessToken');

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
      credentials: 'include'
    });

    if (!response.ok) {
      console.error('Failed to fetch user data with accessToken (Server Action) - Status:', response.status);
      await clearServerSideTokens();
      return null;
    }

    const userData = await response.json();
    return userData || null;
  } catch (error) {
    console.error('Error in getUserAction:', error);
    await clearServerSideTokens();
    return null;
  }
}

export async function logoutAction() {
  await clearServerSideTokens();
  return { success: true };
}
