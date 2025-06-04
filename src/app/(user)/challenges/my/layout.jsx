"use client";

import React from "react";
import MyChallengesTab from "./_components/MyChallengesTab";
import Container from "@/components/container/PageContainer";
import { usePathname } from "next/navigation";
import ApplyChallenge from "../_components/ApplyChallenge";

function myChallengeLayout({ children }) {
  const pathname = usePathname();
  const isApplicationDetail = /^\/challenges\/my\/apply\/[^/]+$/.test(pathname);

  return (
    <Container maxWidth="max-w-[var(--container-challenge)]" className="mt-[16px] mb-[65px] px-6 2xl:px-0">
      {isApplicationDetail ? (
        children
      ) : (
        <>
          <div className="mt-4 flex h-10 justify-between">
            <h2 className="flex-1 text-xl font-semibold">나의 챌린지</h2>
            <ApplyChallenge />
          </div>
          <MyChallengesTab />
          <div>{children}</div>
        </>
      )}
    </Container>
  );
}

export default myChallengeLayout;
