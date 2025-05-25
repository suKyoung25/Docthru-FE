"use client";

import React from 'react'
import { formatDate } from '@/lib/utils/formatDate';
import { useRouter } from 'next/navigation';


/*
- data : api reponse
- columns : 상위 컴포넌트에서 요청한 테이블 명, flex, 스타일 등

- className : 상위 컴포넌트에서 보낸 스타일
- flex : 각 컬럼이 차지할 비율
- render : 셀에 커스텀된 내용을 출력해야 할 때 사용

// 예시 코드
const columnSetting = [
    { key: "id", label: "No.", flex: 0.8 , className: "pl-4 " },
    { key: "docType", label: "분야", flex: 1 },
    { key: "category", label: "카테고리", flex: 1 },
    { key: "title", label: "챌린지 제목", flex: 3, className: "text-gray-700 font-medium"},
    { key: "maxParticipant", label: "인원", flex: 1 },
    { key: "createdAt", label: "신청일", flex: 1 },
    { key: "updatedAt", label: "마감기한", flex: 1 },
    { 
      key: "adminSatus", 
      label: "상태", 
      flex: 1.2, 
      render: 
        (data) => 
          !!data.application?.adminStatus 
          ? (<AdminStatusChip status={data.application?.adminStatus}/> ) 
          : "null" 
    }
]

*/
export default function ListRow({data, columnSetting, onClick }) {

  return (
    <div 
      onClick={onClick}
      className="w-full flex min-w-[670px] min-h-12 bg-white border-b border-gray-300 hover:bg-[#f5f5f5] hover:cursor-pointer">
        {columnSetting.map(({ key, className, flex, render }) => (
            <div
                key={key}
                style={{flex}}
                className={`${className} flex text-left px-1 text-gray-500 text-[13px] font-normal items-center break-all whitespace-normal `}  
            >
                { 
                  render
                  ? render(data)
                  : (key === 'createdAt' || key === 'updatedAt' )
                  ? formatDate(data[key]) 
                  : data[key]}
            </div>
        ))}
    </div>
  )
}
