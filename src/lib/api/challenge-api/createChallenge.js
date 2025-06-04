"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

//챌린지 신청하기
export async function postChallenges(data) {
  const { title, originalUrl, maxParticipant, description, deadline, category, docType } = data;

  const postData = {
    title,
    originalUrl,
    maxParticipant,
    description,
    deadline,
    category,
    docType
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("액세스 토큰 없음");
  }

  const res = await fetch(`${BASE_URL}/challenges`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Cookie: `accessToken=${accessToken}`
    },
    body: JSON.stringify(postData)
  });

  if (!res.ok) throw new Error("챌린지를 생성할 수 없습니다.");

  return res.json();
}
