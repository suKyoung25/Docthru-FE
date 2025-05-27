// page.js
"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import useChallenges from "@/hooks/useChanges";

function Page() {
  const [isModal, setIsModal] = useState(false);

  // 커스텀 훅에서 필요한 값과 함수들을 가져옵니다.
  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading, // 로딩 상태
    error, // 에러 상태
    setPage,
    setKeyword,
    applyFilters,
  } = useChallenges();

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters); // 훅에서 정의된 필터 적용 함수 호출
    setIsModal(false);
  };

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort
            onClick={handleClickFilter}
            isFiltered={filterCount > 0}
            count={filterCount}
          />
          {isModal && ( // 모달은 isModal 상태에 따라 렌더링
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
          <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? ( // 로딩 중일 때
          <div>챌린지 목록을 불러오는 중...</div>
        ) : error ? ( // 에러 발생 시
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? ( // 챌린지가 있을 때
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
            />
          ))
        ) : ( // 챌린지가 없을 때
          <div>챌린지가 존재하지 않습니다.</div>
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