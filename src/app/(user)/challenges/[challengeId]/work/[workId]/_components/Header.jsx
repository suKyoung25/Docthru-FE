'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NextjsChip from '@/components/chip/chipType/NextjsChip';
import ApiChip from '@/components/chip/chipType/ApiChip';
import CareerChip from '@/components/chip/chipType/CareerChip';
import ModernJSChip from '@/components/chip/chipType/ModernjsChip';
import WebChip from '@/components/chip/chipType/WebChip';
import BlogChip from '@/components/chip/chipCategory/BlogChip';
import OfficialDocChip from '@/components/chip/chipCategory/OfficialDocChip';

const categoryComponentMap = {
  'Next.js': NextjsChip,
  API: ApiChip,
  Career: CareerChip,
  'Modern JS': ModernJSChip,
  Web: WebChip
};

const docTypeComponentMap = {
  블로그: BlogChip,
  공식문서: OfficialDocChip
};

export default function Header() {
  const params = useParams();
  const challengeId = params.challengeId;
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    if (!challengeId) return;

    const fetchChallenge = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}`);
        if (!res.ok) throw new Error('챌린지 불러오기 실패');
        const { data } = await res.json();
        setChallenge(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  return (
    <div>
      <div>
        <div className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">{challenge?.title || 'Loading...'}</div>
      </div>
      <div className="flex items-center gap-2">
        {/*카테고리 칩*/}
        {challenge?.category &&
          categoryComponentMap[challenge.category] &&
          React.createElement(categoryComponentMap[challenge.category])}

        {/*문서 타입 칩*/}
        {challenge?.docType &&
          docTypeComponentMap[challenge.docType] &&
          React.createElement(docTypeComponentMap[challenge.docType])}
      </div>
    </div>
  );
}
