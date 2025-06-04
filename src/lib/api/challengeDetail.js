import { BASE_URL } from "@/constant/constant";

// 챌린지 상세 조회
export async function getChallengeDetail(challengeId) {
  const res = await fetch(`${BASE_URL}/challenges/${challengeId}`, {
    credentials: "include"
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "챌린지 정보를 불러올 수 없습니다.");
  }

  const result = await res.json();
  return result.data;
}
