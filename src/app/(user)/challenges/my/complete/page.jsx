"use client";

import React, { useEffect, useRef, useState } from "react";
import Mychallenges from "../_components/MyChallenges";
import { useMyChallenges } from "@/hooks/useMyChallenges";

export default function CompletedChallengesPage() {
  const [keyword, setKeyword] = useState("");
  const { challenges, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyChallenges({
    status: "closed",
    keyword: keyword
  });
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage]);

  console.log(challenges);

  return (
    <Mychallenges
      data={challenges}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      keyword={keyword}
      setKeyword={setKeyword}
    />
  );
}
