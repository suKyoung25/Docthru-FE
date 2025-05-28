"use client";

import SearchInput from "@/components/input/SearchInput";
import React, { useEffect, useState } from "react";
import AppliedChallenges from "./_components/AppliedChallenges";
import { useRouter } from "next/navigation";
import { columnSetting, ITEM_COUNT } from "@/constant/constant";
import { useAuth } from "@/providers/AuthProvider";
import { appliedChallenges } from "@/lib/api/myChallenges";
import Sort from "@/components/sort/Sort";
import useChallenges from "@/hooks/useChallengeList";

export default function AppliedChallengesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const myChallengeStatus = "applied"
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
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8">
          {" "}
          <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex-3 sm:flex-2">
          <Sort />
        </div>
      </div>
       {isLoading ? (
          <div>챌린지 목록을 불러오는 중...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <AppliedChallenges
              columnSetting={columnSetting}
              result={challenges}
              onClick={(id) => router.push(`/challenges/${id}`)}
              totalCount={totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={(newPage) => setPage(newPage)}
            />
          ))
        ) : (
          <div>챌린지가 존재하지 않습니다.</div>
        )}


      
    </>
  );
}
