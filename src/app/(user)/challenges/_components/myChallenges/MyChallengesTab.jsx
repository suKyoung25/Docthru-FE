import { useRouter } from 'next/navigation'
import React from 'react'

const tabStyle = `
        hover:cursor-pointer 
        font-semibold 
        hover:text-brand-black 
        text-base 
        text-gray-500 
        h-12 
        sm:h-13 
        flex 
        items-center 
        justify-center 
        hover:border-b-3 
        border-brand-black 
        flex-3
    `

export default function MyChallengesTab() {

    const router = useRouter();

  return (
    <div className="w-full  flex flex-row justify-around border-b border-gray-300 mb-4">
        <div className={`${tabStyle}`}>참여중인 챌린지</div>
        <div className={`${tabStyle}`}>완료한 챌린지</div>
        <div className={`${tabStyle}`}>신청한 챌린지</div>
    </div>
  )
}
