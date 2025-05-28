"use client";

import SearchInput from "@/components/input/SearchInput";
import AppliedChallenges from "./_components/AppliedChallenges";
import Sort from "@/components/sort/Sort";
import useChallenges from "@/hooks/useChallengeList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { userService } from "@/lib/service/userService";
import ApplyDropdown from "@/components/dropDown/list/ApplyDropdown";

export default function ApplicationsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applications, setApplications] = useState();
  const { user } = useAuth();
  const router = useRouter();

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

  console.log(challenges)
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
        <div className="flex-3 sm:flex-2 relative">
          <Sort isAdminStatus={true} onClick={() => setIsDropdownOpen((prev) => !prev)} />
          <div className="absolute right-0 mt-2">{isDropdownOpen && <ApplyDropdown />}</div>
        </div>
      </div>
       {isLoading ? (
          <div className="text-sm w-full h-full flex items-center justify-center text-gray-500">챌린지 목록을 불러오는 중...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
            <AppliedChallenges
              resultData={challenges}
              onClick={(id) => router.push(`)/challenges/${id}`)}
              totalCount={totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={(newPage) => setPage(newPage)}
            />
        ) : (
          <div className="text-sm w-full h-full flex items-center justify-center text-gray-500">챌린지가 존재하지 않습니다.</div>
        )}
    </>
  );
}
