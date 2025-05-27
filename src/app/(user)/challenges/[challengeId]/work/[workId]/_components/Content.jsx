'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import inactiveHeart from '@/assets/icon/ic_inactive_heart.svg';
import activeHeart from '@/assets/icon/ic_active_heart.svg';
import profile from '@/assets/img/profile_member.svg';
import adminProfile from '@/assets/img/profile_admin.svg';

export default function Content() {
  const params = useParams();
  const workId = params.workId;
  const [work, setWork] = useState(null);

  useEffect(() => {
    if (!workId) return;

    const fetchWork = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('작업 불러오기 실패');
        const { data } = await res.json();
        setWork(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWork();
  }, [workId]);

  // createdAt을 날짜 형식으로 변환
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="my-4 flex h-12 items-center justify-between border-y border-gray-200 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src={work?.user?.role === 'ADMIN' ? adminProfile : profile} width={24} height={24} alt="profile" />

            <div className="text-xs font-medium text-gray-800">{work?.user?.nickname || '닉네임'}</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <button>
              <Image
                src={work?.isLiked ? activeHeart : inactiveHeart}
                width={16}
                height={16}
                alt={work?.isLiked ? 'active_heart' : 'inactive_heart'}
              />
            </button>
            {work?.likeCount || 0}
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500">{work?.createdAt ? formatDate(work.createdAt) : '날짜'}</div>
      </div>
      <div className="mb-6 border-b border-gray-200 pb-10">{work?.content || '내용이 없습니다.'}</div>
    </div>
  );
}
