'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

export async function getServerSideToken(type) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = cookies();

  const decodeToken = (token) => {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch (e) {
      return {};
    }
  };

  const calculateMaxAge = (tokenData) => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return tokenData.exp ? tokenData.exp - nowInSeconds : 60 * 60 * 24 * 30;
  };

  const accessTokenData = decodeToken(accessToken);
  const refreshTokenData = decodeToken(refreshToken);

  const accessTokenExpiresIn = calculateMaxAge(accessTokenData);
  const refreshTokenExpiresIn = calculateMaxAge(refreshTokenData);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: Math.max(0, accessTokenExpiresIn),
    sameSite: 'strict',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  cookieStore.set('refreshToken', refreshToken, {
    path: '/',
    maxAge: Math.max(0, refreshTokenExpiresIn),
    sameSite: 'strict',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
}

export async function updateAccessToken(accessToken) {
  const cookieStore = cookies();
  const accessTokenData = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: Math.max(0, accessTokenExpiresIn),
    sameSite: 'strict',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
}

export async function clearServerSideTokens() {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return { success: true };
}

export async function loginAction(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Action login error response:', errorData);
      throw new Error(errorData.message || '로그인 실패: 서버 응답 오류');
    }

    const userDataFromBody = await response.json();
    console.log('Server Action login success data (body):', userDataFromBody);

    return {
      user: userDataFromBody,
      accessToken: 'dummy_token_set_by_backend_cookie',
      refreshToken: 'dummy_token_set_by_backend_cookie'
    };
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
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Action register error response:', errorData);
      throw new Error(errorData.message || '회원가입 실패: 서버 응답 오류');
    }

    const userDataFromBody = await response.json();
    console.log('Server Action register success data (body):', userDataFromBody);

    return {
      user: userDataFromBody,
      accessToken: 'dummy_token_set_by_backend_cookie',
      refreshToken: 'dummy_token_set_by_backend_cookie'
    };
  } catch (error) {
    console.error('Error in registerAction (Server Action):', error);
    throw error;
  }
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
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch user data with accessToken (Server Action):', response.status);
      await clearServerSideTokens();
      return null;
    }

    const userData = await response.json();
    console.log('User data from getUserAction:', userData);
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
