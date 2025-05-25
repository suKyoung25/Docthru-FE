"use client"
// 나의 챌린지 관련 URL
const BASE_URL = "http://localhost:8080/users/me/challenges";


// 신청한 챌린지
export async function appliedChallenges() {
    try {
        const res = await fetch(`${BASE_URL}?myChallengeStatus=applied`,{
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error("챌린지 목록을 가져올 수 없습니다.");

        const data = await res.json();
        return data;
    
    } catch (error) {
        console.error(error);
    
    }  
}
