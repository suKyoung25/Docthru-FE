'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/container/PageContainer';
import SearchInput from '@/components/input/SearchInput';
import { appliedChallenges } from '@/lib/api/myChallenges';
import ApplyChallenge from '../_components/ApplyChallenge';
import { useRouter } from 'next/navigation';
import MyChallengesTab from '../_components/myChallenges/MyChallengesTab';
import FilterModal from '@/components/modal/FilterModal';
import Sort from '@/components/sort/Sort';
import { useAuth } from '@/providers/AuthProvider';
import { getUserAction } from '@/lib/actions/auth';
import { columnSetting } from '@/constant/constant';
import AppliedChallenges from '../_components/myChallenges/appliedChallenges/AppliedChallenges';

export default function page() {
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5; // 수정
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [result, setResult] = useState([]);
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>로딩 중..</div>;

  async function appliedChallengesData() {
    try {
      const data = await appliedChallenges();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error('목록 불러오기 실패');
    }
  }
  if (isLoading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;

  //신청한 챌린지 목록 불러오기

  useEffect(() => {
    if (user) appliedChallengesData();
  }, []);

  return (-
    <Container>
      <div className="flex justify-between h-10 mt-4">
        <h2 className="flex-1 text-xl font-semibold">나의 챌린지</h2>
        <ApplyChallenge />
      </div>
      <MyChallengesTab />
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8">
          {' '}
          <SearchInput />
        </div>
        <div className="flex-3 sm:flex-2">
          <Sort />
        </div>
      </div>
      <AppliedChallenges
        columnSetting={columnSetting}
        result={result}
        onClick={(id) => router.push(`/challenges/${id}`)}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </Container>
  );
}
