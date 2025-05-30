"use client";

import React from "react";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Mychallenges({ data, loadMoreRef, hasNextPage, isFetchingNextPage, keyword, setKeyword }) {
  return (
    <>
      <SearchInput value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <div ref={loadMoreRef} className="flex flex-col gap-[24px] py-[24px]">
        {data?.length > 0 ? (
          data.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challengeId={challenge?.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
              workId={challenge.works?.[0]?.id}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            챌린지가 존재하지 않습니다.
          </div>
        )}
        <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
          {hasNextPage && !isFetchingNextPage && <LoadingSpinner />}
        </div>
      </div>
    </>
  );
}
