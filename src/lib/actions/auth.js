'use server';

import { cookies } from 'next/headers';
import { authService } from '../service/authService'; // authService는 defaultFetch를 통해 HTTP 요청만 담당합니다.

/**
 * 서버 사이드에서 쿠키로부터 토큰을 가져오는 함수
 * @param {'accessToken' | 'refreshToken'} type - 가져올 토큰의 타입
 * @returns {string | null} 토큰 값 또는 null
 */
export async function getServerSideToken(type) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

/**
 * 서버 사이드에서 accessToken과 refreshToken을 쿠키에 저장하는 함수
 * 백엔드에서 Set-Cookie 헤더로 이미 쿠키를 설정하므로,
 * 이 함수는 실제로 로그인/회원가입 성공 시 `authService`에서 반환된 토큰을
 * 수동으로 설정해야 하는 경우 (예: 테스트 또는 특정 예외 상황)에만 사용될 수 있습니다.
 * 현재 백엔드 응답을 보면, 직접적으로 클라이언트에서 이 함수를 호출할 필요는 없습니다.
 * 하지만 리프레시 토큰 갱신 시 새 액세스 토큰을 서버에서 직접 설정할 때 유용할 수 있습니다.
 */
export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = cookies();

  // 토큰 디코딩 및 만료 시간 계산
  const accessTokenData = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString());
  const refreshTokenData = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64url').toString());

  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);
  const refreshTokenExpiresIn = refreshTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn,
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  cookieStore.set('refreshToken', refreshToken, {
    path: '/',
    maxAge: refreshTokenExpiresIn,
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
}

/**
 * 서버 사이드에서 액세스 토큰만 갱신하는 함수
 */
export async function updateAccessToken(accessToken) {
  const cookieStore = cookies();
  const accessTokenData = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString());
  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn,
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
}

/**
 * 서버 사이드에서 모든 인증 토큰 쿠키를 삭제하는 함수 (로그아웃)
 * @returns {object} 성공 여부 객체
 */
export async function clearServerSideTokens() {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return { success: true };
}

/**
 * 로그인 액션: authService를 호출하여 로그인 처리.
 * 백엔드에서 Set-Cookie 헤더로 토큰을 보내므로, 이 액션은 응답 본문만 반환하면 됩니다.
 * 토큰은 자동으로 브라우저에 저장됩니다.
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {object} 사용자 정보 또는 에러 객체
 */
export async function loginAction(email, password) {
  try {
    const userData = await authService.login(email, password);
    // authService.login 호출 시 백엔드에서 Set-Cookie 헤더를 보내므로,
    // 이 시점에서 이미 쿠키가 브라우저에 저장됩니다.
    // 따라서 setServerSideTokens를 여기서 직접 호출할 필요는 없습니다.
    return userData; // 백엔드에서 반환된 사용자 정보 (id, email, nickname 등)
  } catch (error) {
    console.error('로그인 액션 오류:', error.message);
    return { error: true, message: error.message };
  }
}

/**
 * 회원가입 액션: authService를 호출하여 회원가입 처리.
 * 백엔드에서 Set-Cookie 헤더로 토큰을 보내므로, 이 액션은 응답 본문만 반환하면 됩니다.
 * 토큰은 자동으로 브라우저에 저장됩니다.
 * @param {string} nickname - 사용자 닉네임
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @param {string} passwordConfirmation - 비밀번호 확인
 * @returns {object} 사용자 정보 또는 에러 객체
 */
export async function registerAction(nickname, email, password, passwordConfirmation) {
  try {
    const userData = await authService.register(nickname, email, password, passwordConfirmation);
    // authService.register 호출 시 백엔드에서 Set-Cookie 헤더를 보내므로,
    // 이 시점에서 이미 쿠키가 브라우저에 저장됩니다.
    // 따라서 setServerSideTokens를 여기서 직접 호출할 필요는 없습니다.
    return userData; // 백엔드에서 반환된 사용자 정보 (id, email, nickname 등)
  } catch (error) {
    console.error('회원가입 액션 오류:', error.message);
    return { error: true, message: error.message };
  }
}
