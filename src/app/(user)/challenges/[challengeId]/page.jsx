'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ChallengeCard from '@/components/card/Card';
import ChallengeContainerd from '@/app/(user)/challenges/_components/challengeCard/ChallengeContainer';
import RankingListItem from '@/components/list/RankingListItem';
import userIcon from '@/assets/img/profile_member.svg';
import arrowRight from '@/assets/icon/ic_arrow_right.svg';
import arrowLeft from '@/assets/icon/ic_arrow_left.svg';

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsTablet(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  return isTablet;
}

export default function ChallengeDetailPage() {
  const isTablet = useIsTablet();

  const dummyChallenge = {
    title: 'Next.js - App Router : Routing Fundamentals',
    type: '공식문서',
    category: 'Next.js',
    deadline: '2025-06-01',
    participants: '15/20',
    description:
      'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)',
    createdBy: {
      nickname: '럽윈즈올',
      profileImage: userIcon
    }
  };

  const [rankingData, setRankingData] = useState([
    { rank: 1, userName: '개발life', userRole: '전문가', likes: 9999, isLiked: false, workId: 101 },
    { rank: 2, userName: '라우터장인', userRole: '전문가', likes: 1800, isLiked: true, workId: 102 },
    { rank: 3, userName: 'DevCat99', userRole: '전문가', likes: 700, isLiked: false, workId: 103 },
    { rank: 4, userName: 'ts_master', userRole: '전문가', likes: 600, isLiked: false, workId: 104 },
    { rank: 5, userName: '사피엔스', userRole: '전문가', likes: 500, isLiked: true, workId: 105 },
    { rank: 6, userName: '조성빈', userRole: '전문가', likes: 312, isLiked: false, workId: 106 }
  ]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleLike = (index) => {
    setRankingData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 } : item
      )
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rankingData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="flex flex-col items-center px-4 bg-white">
      <section className="flex flex-col gap-4 md:flex-row md:items-start md:justify-center md:gap-6 w-full max-w-6xl">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <ChallengeCard {...dummyChallenge} variant="simple" />

          <section className="text-gray-800 px-1 sm:px-2 md:px-4">
            <p className="text-sm md:text-base leading-[1.3] whitespace-pre-line">{dummyChallenge.description}</p>
          </section>

          <section className="flex items-center gap-2 p-3">
            <Image
              src={dummyChallenge.createdBy.profileImage}
              alt="작성자 프로필"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{dummyChallenge.createdBy.nickname}</span>
          </section>
        </div>

        <div className="w-full md:w-1/3">
          <ChallengeContainerd height="h-auto" type={isTablet ? '' : 'slim'} />
        </div>
      </section>

      <section className="mt-10 w-full max-w-6xl rounded-xl border-2 border-gray-800 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">참여현황</h3>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-[var(--color-brand-yellow)] font-semibold">{currentPage}</span>
            <span className="text-gray-800">/ {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              <Image
                src={arrowLeft}
                alt="이전"
                width={20}
                height={20}
                className={currentPage === 1 ? 'opacity-30' : ''}
              />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <Image
                src={arrowRight}
                alt="다음"
                width={20}
                height={20}
                className={currentPage === totalPages ? 'opacity-30' : ''}
              />
            </button>
          </div>
        </div>

        <div className="px-4">
          {currentItems.map((item, index) => (
            <RankingListItem key={item.rank} item={item} toggleLike={() => handleToggleLike(startIndex + index)} />
          ))}
        </div>
      </section>
    </main>
  );
}
