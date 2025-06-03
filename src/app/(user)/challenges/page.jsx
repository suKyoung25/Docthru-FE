"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import { useAuth } from "@/providers/AuthProvider";
import Container from "@/components/container/PageContainer";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function ChallengesPage() {
  const [isModal, setIsModal] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const { user } = useAuth();

  //현재 사용자가 일반유저인지, 관리자인지 확인
  const isAdmin = user?.role === "ADMIN";

  const {
    challenges,
    totalCount,
    page,
    pageSize,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters
  } = useChallenges();

  const handleSearch = () => setKeyword(keywordInput);

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
  };

  return (
    <Container maxWidth="max-w-[var(--container-challenge)]" className="mt-[16px] mb-[65px] px-6 2xl:px-0">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="relative mt-[16px] flex flex-row gap-[8px]">
        <div className="w-[99px] md:w-[106px] lg:w-[112px]">
          <Sort onClick={() => setIsModal(true)} isFiltered={filterCount > 0} count={filterCount} />
          {isModal && (
            <div className="fixed top-0 left-0 z-50 h-screen w-screen md:absolute md:top-[50px] md:w-[343px]">
              <FilterModal
                onApply={handleApplyFilters}
                onClose={() => setIsModal(false)}
                initialFields={filters.categories}
                initialDocType={filters.docType}
                initialStatus={filters.status}
              />
            </div>
          )}
        </div>

        <div className="flex-1">
          <SearchInput
            text={"text-[14px]"}
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onEnter={handleSearch}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading && (
          <div className="mt-[15rem] flex h-screen w-full flex-col items-center">
            <LoadingSpinner />
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {challenges?.length > 0 ? (
          <>
            {challenges?.map((challenge) => (
              <div key={challenge.id}>
                <ChallengeCard
                  challengeId={challenge?.id}
                  title={challenge.title}
                  docType={challenge.docType}
                  category={challenge.category}
                  deadline={challenge.deadline}
                  participants={challenge.participants.length}
                  maxParticipant={challenge.maxParticipant}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
            <Pagination
              totalCount={totalCount}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        ) : (
          <div className="mt-[15rem] flex flex-col items-center text-[16px] font-medium text-[var(--color-gray-500)]">
            <div>아직 챌린지가 없어요.</div>
            <div>지금 바로 챌린지를 신청해보세요!</div>
          </div>
        )}
      </div>
    </Container>
  );
}
