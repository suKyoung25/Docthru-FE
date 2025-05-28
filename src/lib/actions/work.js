"use server";

import { cookies } from "next/headers";

export async function deleteWorkAction(workId, adminMessage) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/works/${workId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        deletionReason: "사용자 요청에 의해 삭제된 작업물입니다."
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "작업물 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 작업물 삭제 오류:", err);
    throw err;
  }
}
