"use client";

import React, { useState } from "react";
import Image from "next/image";
import activeHeartIcon from "@/assets/icon/ic_active_heart.svg";
import userIcon from "@/assets/img/profile_member.svg";
import bestIcon from "@/assets/icon/ic_medal.svg";
import nextBtn from "@/assets/btn/btn_right.svg";
import arrowDown from "@/assets/icon/ic_arrow_down.svg";
import arrowUp from "@/assets/icon/ic_arrow_up.svg";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

export default function TopRecommendedWork({ rankingData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});

  if (!rankingData || rankingData.length === 0) return null;

  const maxLikes = Math.max(...rankingData.map((w) => w.likeCount));
  const topWorks = rankingData.filter((w) => w.likeCount === maxLikes);
  const isSingle = topWorks.length === 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % topWorks.length);
  };

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative w-full max-w-6xl overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 95}%)` }}
      >
        {topWorks.map((work, index) => {
          const isCurrent = index === currentIndex;
          const isExpanded = !!expandedIndexes[index];

          return (
            <div
              key={work.workId}
              className={`relative flex min-h-[240px] shrink-0 flex-col rounded-[16px] border-2 border-gray-200 bg-gray-50 transition-all duration-300 ${
                isSingle ? "w-full" : "mr-2 w-[95%]"
              } ${isCurrent || isSingle ? "opacity-100" : "opacity-30"}`}
            >
              {/* 최다 추천 배지 */}
              <div className="absolute top-0 left-0 z-10 flex items-center gap-1 rounded-tl-[16px] rounded-br-[16px] bg-black px-5 py-2 text-sm font-semibold text-white">
                <Image src={bestIcon} alt="메달" width={20} height={20} />
                최다 추천 번역
              </div>

              <div className="m-3 px-4 pt-10">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                  {/* 작성자 정보 왼쪽 */}
                  <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                    <Image src={userIcon} alt="작성자" width={24} height={24} className="shrink-0 rounded-full" />
                    <span className="truncate text-sm font-medium text-gray-800">{work.author.authorNickname}</span>
                    <span className="shrink-0 text-xs text-gray-500">
                      {work.author.grade === "EXPERT" ? "전문가" : work.author.grade === "NORMAL" ? "일반" : "미정"}
                    </span>
                    <div className="flex shrink-0 items-center gap-1 text-sm text-gray-600">
                      <Image src={activeHeartIcon} alt="좋아요" width={16} height={16} />
                      {work.likeCount}
                    </div>
                  </div>

                  {/* 작성 시간 오른쪽 */}
                  <span className="shrink-0 text-xs whitespace-nowrap text-gray-400">
                    {dayjs(work.createdAt).format("YYYY/MM/DD HH:mm")}
                  </span>
                </div>
              </div>

              {/* 내용 영역 */}
              <div className="flex flex-grow flex-col px-6">
                <hr className="mb-2 border-t border-gray-300" />

                <div
                  className={`prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-line text-gray-700 ${
                    isExpanded ? "" : "line-clamp-5"
                  }`}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(work.content) }}
                />

                {/* 더보기 버튼 */}
                {work.content.length > 500 && (
                  <div className="mt-auto mb-4 flex justify-center">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
                    >
                      <span>{isExpanded ? "접기" : "더보기"}</span>
                      <Image
                        src={isExpanded ? arrowUp : arrowDown}
                        alt={isExpanded ? "접기" : "더보기"}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* 다음 버튼 */}
              {!isSingle && isCurrent && (
                <div className="absolute top-1/2 right-[-20px] z-20 -translate-y-1/2">
                  <button onClick={handleNext}>
                    <Image src={nextBtn} alt="다음 번역 보기" width={32} height={32} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
