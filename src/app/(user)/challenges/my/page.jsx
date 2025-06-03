"use client";

import { useMyChallenges } from "@/hooks/useMyChallenges";
import Mychallenges from "./_components/MyChallenges";
import { useEffect, useRef, useState } from "react";

export default function ParticipatedChallengesPage() {
  const [keyword, setKeyword] = useState("");
  const { challenges, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyChallenges({
    status: "open,full",
    keyword
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
