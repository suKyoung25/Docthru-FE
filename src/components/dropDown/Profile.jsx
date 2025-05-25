'use client';

import React from 'react';
import Image from 'next/image';
import userImage from '@/assets/img/profile_member.svg';
import adminImage from '@/assets/img/profile_admin.svg';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

function Profile({ userRole }) {
  const router = useRouter();
  const isAdmin = userRole === 'admin';
  const { user, logout } = useAuth();

  const handleClickMychallenge = () => {
    router.push('/my/challenges');
  };

  return (
    <div className="flex w-fit flex-col items-start rounded-[8px] bg-[#FFFFFF] px-[16px] pt-[16px] pb-[8px] border border-gray-100">
      <div className="flex min-w-38 flex-row justify-baseline gap-[8px]">
        <Image src={isAdmin ? adminImage : userImage} alt="프로필 이미지" width={32} height={32} />
        <div className="flex flex-col gap-[2px]">
          {/* DB에서 불러온 유저 이름으로 변경 필수 */}
          <div className="text-[14px] font-medium text-[var(--color-gray-800)]">{user?.nickname}</div>
          {/* DB에서 불러온 유저 등급으로 변경 필수 */}
          <div className="text-[12px] font-medium text-[var(--color-gray-500)]">{isAdmin ? '어드민' : '전문가'}</div>
        </div>
      </div>
      <span className="flex w-full border-b-2 border-gray-100 my-2"></span>
      {!isAdmin && (
        <button
          className="h-8 text-sm md:text-base font-medium text-[var(--color-gray-800)]"
          onClick={handleClickMychallenge}
        >
          나의 챌린지
        </button>
      )}
      <button className="h-8 text-sm md:text-base font-medium text-[var(--color-gray-400)]" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
