"use client";

import React from 'react'
import { formatDate } from '../../_components/utils/formatDate';

/**
 * @param {Array} columns - 컬럼 배열. 각 컬럼은 { label: string, flex: number } 형태
 */


export default function ListRow({data, columns }) {

  return (
    <div className="w-full flex min-w-[670px] min-h-12 bg-white border-b border-gray-300">
        {columns.map(({ key, className, flex }) => (
            <div
                key={key}
                style={{flex}}
                className={`${className} flex text-left text-gray-500 text-[13px] font-normal items-center break-all whitespace-normal `}  
            >
                {(key === 'createdAt' || key === 'updatedAt') ? formatDate(data[key]) : data[key]}
            </div>
        ))}
    </div>
  )
}
