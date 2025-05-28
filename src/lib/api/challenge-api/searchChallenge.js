
"use server";

import { API_URL } from '@/constant/constant';
import { cookies } from 'next/headers';

// accessToken을 안전하게 추출
const getAccessToken = async () => {
  const cookieStore = await cookies(); // 동기
  const token = cookieStore.get("accessToken"); // 동기
  return token?.value;
};

// fetch 요청에 사용할 headers 구성
const getAuthHeaders = async () => {
  const accessToken = await getAccessToken(); // 반드시 await 필요
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${accessToken}`
  };
};

// 챌린지 목록 가져오기
export async function getChallenges({ page = 1, pageSize = 4, category, docType, keyword, myChallengeStatus}) {
  const headers = await getAuthHeaders();

  const params = new URLSearchParams();
  params.set("page", page);
  params.set("pageSize", pageSize);
  if (category) params.set("category", category);
  if (docType) params.set("docType", docType);
  if (keyword) {
    const cleanedKeyword = keyword.replace(/\s+/g, "");
    params.set("keyword", cleanedKeyword);
  }


    try {
    let url = myChallengeStatus
      ? `${API_URL}/users/me/challenges?myChallengeStatus=${myChallengeStatus}&${params.toString()}`
      : `${API_URL}/challenges?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers, // ✅ headers 추가
      credentials: "include" // 필요하다면
    });

    if (!res.ok) throw new Error("챌린지 목록을 가져올 수 없습니다.");
    return res.json();
  } catch (error) {
    console.error("🚨 서버 액션 - 챌린지 목록 오류", error);
    throw error;
  }
}

