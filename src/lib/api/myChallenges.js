import { BASE_URL } from '@/constant/constant';


//참여중인 챌린지


// 챌린지 목록 가져오기
export async function getMyChallenges({ page = 1, pageSize = 4, category, docType, keyword, status = "participated" }) {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('pageSize', pageSize);
  if (category) params.set('category', category);
  if (docType) params.set('docType', docType);
  if (keyword) params.set('keyword', keyword);

  const res = await fetch(`${BASE_URL}/users/me/challenges?myChallengeStatus=${status}&${params.toString()}`,{
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error('챌린지 목록을 가져올 수 없습니다.');
  return res.json();
}


// // 신청한 챌린지
// export async function appliedChallenges({page=1, pageSize, category, docType, keyword }) {
//     try {
//         const res = await fetch(`${BASE_URL}/users/me/challenges?myChallengeStatus=applied&page=${page}&pageSize=${pageSize}`,{
//             method: "GET",
//             credentials: "include",
//         });
        
//         if (!res.ok) throw new Error("챌린지 목록을 가져올 수 없습니다.");
        
//         const data = await res.json();
//         console.log(data)
//         return {
//             data: data.data,
//             totalCount: data.totalCount,
//             currentPage: data.currentPage,
//             pageSize: data.pageSize,
//         }
    
//     } catch (error) {
//         console.error(error);
//          return {
//             data: [],
//             totalCount: 0,
//             currentPage: page,
//             pageSize,
//         };
//     }  
// }
