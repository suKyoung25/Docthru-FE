"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/container/PageContainer";
import ChallengeContainerd from "../_components/challengeCard/ChallengeContainer";
import SearchInput from "@/components/input/SearchInput";
import Profile from "@/components/dropDown/Profile";
import ListHead from '../_components/myChallenges/appliedChallenges/ListHead';
import { appliedChallenges } from '@/lib/api/myChallenges';
import ApplyChallenge from '../_components/ApplyChallenge';
import { useRouter } from 'next/navigation';
import MyChallengesTab from '../_components/myChallenges/MyChallengesTab';
import FilterModal from '@/components/modal/FilterModal';
import Sort from '@/components/sort/Sort';
import { useAuth } from "@/providers/AuthProvider";
import { getUserAction } from "@/lib/actions/auth";
import MapResultData from "../_components/myChallenges/appliedChallenges/MapResultData";
import { columnSetting } from "@/constant/constant";
import { appliedMockData } from "./appliedMockData";
import Pagination from "@/components/pagination/Pagination";




export default function page() {
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5; // 수정
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = appliedMockData.slice(startIndex, endIndex);


  // const [result, setResult] = useState([]);
  // const { user, isLoading } = useAuth();
  
  // if(isLoading) return (<div>로딩 중..</div>);
 
  // console.log('User status changed!!:', user);

  // async function appliedChallengesData() {
  //   try {
  //     const data = await appliedChallenges();
  //     setResult(data);
  //   } catch (error) {
  //     console.error("목록 불러오기 실패");
  //   }
  // }
  // if (isLoading) return <div>로딩 중...</div>;
  // if (!user) return <div>로그인이 필요합니다.</div>;
  // console.log(user);
  // 신청한 챌린지 목록 불러오기

  // useEffect(()=>{
  //   setResult(appliedMockData);
  //  // if (user) appliedChallengesData();
  // },[])


  
  return (
    <Container>
      <div className="flex justify-between h-10 mt-4">
        <h2 className="flex-1 text-xl font-semibold">
          나의 챌린지 
        </h2>
        <ApplyChallenge />
      </div>
      <MyChallengesTab />
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8"> <SearchInput /></div>
        <div className="flex-3 sm:flex-2"><Sort /></div>
      </div>
      <ListHead columnSetting={columnSetting} />
      <MapResultData 
        columnSetting={columnSetting} // 매칭 데이터, 너비, 스타일링 셋팅
        resultData={paginatedData} // api response
        onClick={() => router.push(`/challenges/${data.id}`)} // 상세페이지로 이동
      />
      <div className="mt-5">
      <Pagination
        totalCount={appliedMockData.length} // ← 50
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
      </div>
    </Container>
  );
}

