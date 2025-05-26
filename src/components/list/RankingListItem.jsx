'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import keyboardIcon from '@/assets/img/profile_member.svg';
import activeHeartIcon from '@/assets/icon/ic_active_heart.svg';
import inactiveHeartIcon from '@/assets/icon/ic_inactive_heart.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import arrowRightIcon from '@/assets/icon/ic_arrow_right.svg';

/**
 * RankingListItem 컴포넌트
 *
 * 좋아요 수 기준으로 유저를 정렬한 랭킹 리스트 항목 UI를 렌더링합니다.
 * - 하트 아이콘을 클릭하면 애니메이션 효과가 발생하며 `toggleLike` 함수가 호출됩니다.
 * - 1등인 경우 왕관 아이콘이 표시됩니다.
 * - `item` 객체로 유저의 순위, 이름, 직무, 좋아요 수, 좋아요 여부 등을 전달받습니다.
 *
 * @component
 * @example
 * const item = {
 *   rank: 1,
 *   userName: "홍길동",
 *   userRole: "프로그래머",
 *   likes: 10000,
 *   isLiked: false,
 * };
 *
 * <RankingListItem
 *   item={item}
 *   toggleLike={() => console.log("좋아요!")}
 * />
 *
 * @param {Object} props
 * @param {{
 *   rank: number,
 *   userName: string,
 *   userRole: string,
 *   likes: number,
 *   isLiked: boolean,
 *   workId?: number,
 * }} props.item - 유저 정보를 담은 객체
 * @param {() => void} props.toggleLike - 좋아요 버튼 클릭 시 호출되는 콜백 함수
 */
export default function RankingListItem({ item, toggleLike }) {
  const { rank = 1, userName = '홍길동', userRole = '프로그래머', likes = 0, isLiked = false, workId = 0 } = item;

  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLikeClick = () => {
    if (!isLikedState) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
    }

    setIsLikedState(!isLikedState);
    toggleLike();
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-transparent py-4">
      {/* 왼쪽: 랭킹, 유저 정보 */}
      <div className="flex items-center gap-3">
        <div className="flex w-[60px] items-center justify-center rounded-2xl bg-gray-800 px-3 py-1 text-[14px] font-[500] text-yellow-400">
          {rank === 1 && <Image src={crownIcon} alt="crown" width={12} height={12} className="mr-1.5" />}
          {rank.toString().padStart(2, '0')}
        </div>
        <Image src={keyboardIcon} alt="profile" width={24} height={24} className="rounded-full" />
        <div>
          <div className="text-[14px] font-medium text-gray-800">{userName}</div>
          <div className="text-[12px] text-gray-500">{userRole}</div>
        </div>
      </div>

      {/* 오른쪽: 좋아요, 작업물 보기 */}
      <div className="flex w-[210px] items-center justify-between gap-4">
        <button onClick={handleLikeClick} className={`flex items-center text-lg font-medium text-gray-500`}>
          <Image
            src={isLikedState ? activeHeartIcon : inactiveHeartIcon}
            alt="like"
            width={20}
            height={20}
            className={`mr-1 transition-transform duration-200 ${isAnimating ? 'scale-125' : 'scale-100'}`}
          />
          {likes >= 10000 ? '9999...' : likes.toLocaleString()}
        </button>
        <Link
          href={`/challenge/work/${workId}`}
          className="flex items-center gap-1 text-base font-normal text-gray-800 no-underline transition-colors"
        >
          작업물 보기
          <span className="text-lg">
            <Image src={arrowRightIcon} alt="arrow-right" width={30} height={30} />
          </span>
        </Link>
      </div>
    </div>
  );
}
