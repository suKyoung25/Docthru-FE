'use server';

// actions.js
export async function loginAction(email, password) {
  try {
    const response = await authService.login(email, password);

    // --- 여기에 강력한 디버깅 로그 추가 ---
    console.log('--- DEBUG START: loginAction ---');
    console.log('1. Raw response from authService.login:', response);
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
      } else {
        console.error('8. CRITICAL: response.headers.getAll is NOT a function before actual call!');
      }
    } else {
      console.error("9. CRITICAL: 'headers' property missing or response is not an object!");
    }
    console.log('--- DEBUG END: loginAction ---');
    // --- 디버깅 로그 끝 ---

    if (!response.ok) {
      // ... (기존 에러 처리 로직)
    }

    // 문제가 발생하는 줄:
    const setCookieHeaders = response.headers.getAll('Set-Cookie');
    // ... (나머지 로직)
  } catch (error) {
    console.error('로그인 액션 오류:', error.message);
    return { error: true, message: error.message };
  }
}
