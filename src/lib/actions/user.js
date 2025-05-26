"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

// 사용자 정보 조회
export async function getUserAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      throw new Error("유저 정보를 불러오는데 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("getUserAction 에러:", err);
    throw err;
  }
}
