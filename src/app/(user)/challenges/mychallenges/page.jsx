"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/container/PageContainer";
import ChallengeContainerd from "../_components/challengeCard/ChallengeContainer";
import SearchInput from "@/components/input/SearchInput";
import Profile from "@/components/dropDown/Profile";
import ListHead from '../_components/myChallenges/appliedChallenges/ListHead';
import ListRow from '../_components/myChallenges/appliedChallenges/ListRow';
import AdminStatusChip from '../_components/myChallenges/appliedChallenges/AdminStatusChip';
import { appliedChallenges } from '@/lib/api/myChallenges';
import ApplyChallenge from '../_components/ApplyChallenge';
import { useRouter } from 'next/navigation';
import MyChallengesTab from '../_components/myChallenges/MyChallengesTab';
import FilterModal from '@/components/modal/FilterModal';
import Sort from '@/components/sort/Sort';
import { useAuth } from "@/providers/AuthProvider";
import { getUserAction } from "@/lib/actions/auth";


/* 
key : 테이블 필드명
label : 필드의 게시판 타이틀명
flex : 너비 비율
className : 각 셀의 스타일링
render : 해당 셀에 상태에 따라 다른 값을 노출해야 할 경우 
*/

const columnSetting = [
    { key: "id", label: "No.", flex: 0.8 , className: "pl-4" },
    { key: "docType", label: "분야", flex: 1 },
    { key: "category", label: "카테고리", flex: 1 },
    { key: "title", label: "챌린지 제목", flex: 5, className: "text-gray-700 font-medium"},
    { key: "maxParticipant", label: "인원", flex: 1 },
    { key: "createdAt", label: "신청일", flex: 1 },
    { key: "updatedAt", label: "마감기한", flex: 1 },
    { 
      key: "adminSatus", 
      label: "상태", 
      flex: 1.2, 
      render: 
        (data) => 
          !!data.application?.adminStatus 
          // adminStatus 필드를 사용할 경우 아래 컴포넌트 사용해 값마다 다른 스타일링을 보여줌
          ? (<AdminStatusChip status={data.application?.adminStatus}/> ) 
          : "null" 
    }
]
export default function page() {
  const router = useRouter();
  const [result, setResult] = useState([]);
  const { user, isLoading } = useAuth();
  
  if(isLoading) return (<div>로딩 중..</div>);
 
  console.log('User status changed!!:', user);

  async function appliedChallengesData() {
    try {
      const data = await appliedChallenges();
      setResult(data);
    } catch (error) {
      console.error("목록 불러오기 실패");
    }
  }
  if (isLoading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;
  console.log(user);
  // 신청한 챌린지 목록 불러오기

  useEffect(()=>{
    if (user) appliedChallengesData();
  },[])


  
  return (
    <Container>
      <div className="flex justify-between h-10 mt-4">
        { user.email ?? 
        (<h2 className="flex-1 text-xl font-semibold">
          챌린지 
        </h2>)}
        <ApplyChallenge />
      </div>
      <MyChallengesTab />
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8"> <SearchInput /></div>
        <div className="flex-3 sm:flex-2"><Sort /></div>
      </div>
      <ListHead columnSetting={columnSetting} />
      {result.map((appliedChallenges, idx) => (
        <ListRow 
          key={idx} 
          data={appliedChallenges} 
          columnSetting={columnSetting} 
          onClick={() => router.push(`/challenges/${appliedChallenges.id}`)} 
        />
      ))}
    </Container>
  );
}

