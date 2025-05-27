"use client";

import SearchInput from "@/components/input/SearchInput";
import AppliedChallenges from "./_components/AppliedChallenges";
import Sort from "@/components/sort/Sort";
import React, { useEffect, useState } from "react";
import { ITEM_COUNT } from "@/constant/constant";
import { useAuth } from "@/providers/AuthProvider";
import { userService } from "@/lib/service/userService";

export default function ApplicationsPage() {
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = ITEM_COUNT.APPLICATION;
  const [applications, setApplications] = useState();
  const { user } = useAuth();

  async function fetchApplicationList() {
    try {
      const result = await userService.getApplications(page, pageSize);
      setApplications(result?.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error(error, "목록 불러오기 실패");
    }
  }

  useEffect(() => {
    if (user) {
      fetchApplicationList();
    }
  }, [page, user]);

  console.log(applications);

  return (
    <>
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex-7 sm:flex-8">
          <SearchInput />
        </div>
        <div className="flex-3 sm:flex-2">
          <Sort />
        </div>
      </div>
      <AppliedChallenges
        resultData={applications}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
