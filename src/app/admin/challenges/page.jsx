"use client";

import Sort from "@/components/sort/Sort";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import ApplyChallenge from "@/app/(user)/challenges/_components/ApplyChallenge";
import DeleteModal from "@/components/modal/DeleteModal";

function Page() {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [challengeToDeleteId, setChallengeToDeleteId] = useState(null);

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
    applyFilters,
  } = useChallenges();

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
    setIsModal(false);
  };

  // 삭제 모달을 여는 함수
  const handleDeleteClick = (challengeId) => {
    setChallengeToDeleteId(challengeId);
    setIsDeleteModalOpen(true);
  };

  // 삭제 확인 함수
  const handleConfirmDelete = () => {
    // 여기에 챌린지 삭제 로직을 구현
    console.log("챌린지 ID:", challengeToDeleteId, "삭제 중입니다.");
    setIsDeleteModalOpen(false);
    setChallengeToDeleteId(null);
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
          <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div>챌린지 목록을 불러오는 중...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
              onDeleteClick={() => handleDeleteClick(challenge.id)}
            />
          ))
        ) : (
          <div>챌린지가 존재하지 않습니다.</div>
        )}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {isDeleteModalOpen && (
        <DeleteModal
          text="정말로 이 챌린지를 삭제하시겠어요?"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isLoggedIn={true} // 삭제 버튼을 보려면 사용자가 로그인했다고 가정
        />
      )}
    </div>
  );
}

export default Page;