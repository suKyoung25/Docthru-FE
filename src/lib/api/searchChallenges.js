//챌린지 보기 페이지에서 사용되는 fetch 입니다.
const BASE_URL = 'http://localhost:8080/challenges';

//챌린지 목록 가져오기
export async function getChallenges({ page = 1, pageSize = 4, category, docType, keyword }) {
  const res = await fetch(
    `${BASE_URL}?page=${page}&pageSize=${pageSize}&category=${category}&docType=${docType}&keyword=${keyword}`
  );

  if (!res.ok) throw new Error('챌린지 목록을 가져올 수 없습니다.');

  return res.json();
}
