import { jwtVerify } from "jose";

export async function decodeAccessToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    return payload;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
