// lib/utils/auth.js

/**
 * 이메일 유효성 검사(정규식)
 */
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * 비밀번호 유효성 검사(정규식)
 */
export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
};

// --- 아래 함수들은 이제 필요 없거나, Server Actions에서 관리됩니다. ---
// export function setTokensToCookie(accessToken, refreshToken) { ... }
// export async function getTokenFromCookie(type = "accessToken") { ... }
// export function isAuthenticated() { ... }
