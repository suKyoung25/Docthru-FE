"use client";

import React from "react";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import useChallenges from "@/hooks/useChallengeList";
export default function CompletedChallengesPage() {
  
  const myChallengeStatus = "completed"
  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    isLoading,
    error,
    setPage,
    setKeyword,
  } = useChallenges(myChallengeStatus);

  return (
    <>
      <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
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
            />
          ))
        ) : (
          <div>챌린지가 존재하지 않습니다.</div>
        )}
      </div>

      {/* <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}

    </>  
  );
}
