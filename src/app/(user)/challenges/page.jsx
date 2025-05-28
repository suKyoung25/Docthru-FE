"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useEffect, useMemo, useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Hangul from "hangul-js";

function Page() {
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  //현재 사용자가 일반유저인지, 관리자인지 확인
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  //디버깅
  if (isAdmin) {
    console.log("관리자");
  } else if (user?.role === "USER") {
    console.log("일반 유저");
  } else {
    console.log("로그인 필요");
  }

  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters
  } = useChallenges();

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleClickCard = (challengeId) => {
    router.push(`/challenges/${challengeId}`);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
    setIsModal(false);
  };

  //초성으로 검색하기 위한 함수 (검색어의 초성만 추출하여 문자열로 반환)
  const getInitials = (text) => {
    if (!text) return "";
    return Hangul.d(text, true)
      .map(([initial]) => initial)
      .join("");
  };

  //이미 검색어가 초성이라면 getInitials 함수 적용되면 오류남
  const isInitialsOnly = (text) => {
    // 초성 범위 (ㄱ ~ ㅎ) 정규식
    return /^[ㄱ-ㅎ]+$/.test(text);
  };

  //초성 검색어로 챌린지를 찾아 반환하는 함수
  const filteredChallenges = useMemo(() => {
    if (!keyword) return challenges;

    const keywordInitials = isInitialsOnly(keyword) ? keyword : getInitials(keyword);

    const includeKeywordChallenges = challenges.filter((challenge) => {
      const titleInitials = getInitials(challenge.title);
      return titleInitials.includes(keywordInitials);
    });

    //디버깅
    console.log("keywordInitials", keywordInitials); //정상
    console.log("includeKeywordChallenges", includeKeywordChallenges);

    return includeKeywordChallenges;
  }, [challenges, keyword]);

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px] [@media(min-width:1200px)]:mx-[462px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort onClick={handleClickFilter} isFiltered={filterCount > 0} count={filterCount} />
          {isModal && (
            <FilterModal
              onApply={handleApplyFilters}
              onClose={() => setIsModal(false)}
              initialFields={filters.categories}
              initialDocType={filters.docType}
              initialStatus={filters.status}
            />
          )}
        </div>
        <div className="flex-[2.5]">
          <SearchInput text={"text-[14px]"} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div className="font-pretendard flex h-full w-full flex-col items-center justify-center text-[16px] font-medium text-[var(--color-gray-500)]">
            챌린지 목록을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <div key={challenge.id} onClick={() => handleClickCard(challenge.id)}>
              <ChallengeCard
                title={challenge.title}
                type={challenge.docType}
                category={challenge.category}
                deadline={challenge.deadline}
                participants={challenge.participants.length}
                maxParticipant={challenge.maxParticipant}
                isAdmin={isAdmin}
              />
            </div>
          ))
        ) : (
          <div className="font-pretendard flex h-full w-full flex-col items-center justify-center text-[16px] font-medium text-[var(--color-gray-500)]">
            <div>아직 챌린지가 없어요.</div>
            <div>지금 바로 챌린지를 신청해보세요!</div>
          </div>
        )}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Page;
