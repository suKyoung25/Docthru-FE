"use client";

import React, { useState } from "react";
import ChallengeCard from "@/components/card/Card";
import ChallengeContainerd from "@/app/(user)/challenges/_components/challengeCard/ChallengeContainer";
import Image from "next/image";
import userIcon from "@/assets/img/profile_member.svg";
import RankingListItem from "@/components/list/RankingListItem";
import arrowRight from "@/assets/icon/ic_arrow_right.svg";
import arrowLeft from "@/assets/icon/ic_arrow_left.svg";

export default function ChallengeDetailPage() {
  const dummyChallenge = {
    title: "Next.js - App Router : Routing Fundamentals",
    type: "nextjs",
    category: "officialdoc",
    deadline: "2025-06-01",
    participants: "15/20",
    description:
      "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
    createdBy: {
      nickname: "dev_sungbin",
      profileImage: userIcon,
    },
  };

  const [rankingData, setRankingData] = useState([
    {
      rank: 1,
      userName: "홍길동",
      userRole: "전문가",
      likes: 1234,
      isLiked: false,
      workId: 101,
    },
    {
      rank: 2,
      userName: "김철수",
      userRole: "전문가",
      likes: 456,
      isLiked: true,
      workId: 102,
    },
    {
      rank: 3,
      userName: "이영희",
      userRole: "전문가",
      likes: 789,
      isLiked: false,
      workId: 103,
    },
    {
      rank: 4,
      userName: "박민수",
      userRole: "전문가",
      likes: 321,
      isLiked: false,
      workId: 104,
    },
    {
      rank: 5,
      userName: "최지우",
      userRole: "전문가",
      likes: 654,
      isLiked: true,
      workId: 105,
    },
    {
      rank: 6,
      userName: "조성빈",
      userRole: "전문가",
      likes: 777,
      isLiked: false,
      workId: 106,
    },
  ]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleLike = (index) => {
    setRankingData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item,
      ),
    );
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rankingData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="flex flex-col items-center px-4 pt-12">
      <div className="w-full max-w-sm">
        <ChallengeCard
          title={dummyChallenge.title}
          type={dummyChallenge.type}
          category={dummyChallenge.category}
          deadline={dummyChallenge.deadline}
          participants={dummyChallenge.participants}
          variant="simple"
        />
      </div>

      {/* 설명 */}
      <section className="mt-6 w-full max-w-sm text-gray-800">
        <p className="text-base leading-relaxed whitespace-pre-line">
          {dummyChallenge.description}
        </p>
      </section>

      {/* 작성자 정보 */}
      <section className="mt-6 flex w-full max-w-sm items-center gap-2">
        <Image
          src={dummyChallenge.createdBy.profileImage}
          alt="작성자 프로필"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium text-gray-700">
          {dummyChallenge.createdBy.nickname}
        </span>
      </section>

      {/* 도전하기 버튼 */}
      <section className="mt-8 w-full max-w-sm">
        <ChallengeContainerd height="h-auto" type="slim" />
      </section>

      {/* 참여현황 리스트 */}
      <section className="mt-10 w-full max-w-sm rounded-xl border-2 border-gray-800 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base font-semibold text-gray-800">참여현황</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-50 px-3 py-0.5 text-sm text-gray-800">
              {currentPage} / {totalPages}
            </span>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              <Image
                src={arrowLeft}
                alt="이전"
                width={20}
                height={20}
                className={`${currentPage === 1 ? "opacity-30" : ""}`}
              />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <Image
                src={arrowRight}
                alt="다음"
                width={20}
                height={20}
                className={`${currentPage === totalPages ? "opacity-30" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="px-4">
          {currentItems.map((item, index) => (
            <RankingListItem
              key={item.rank}
              item={item}
              toggleLike={() => handleToggleLike(startIndex + index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
