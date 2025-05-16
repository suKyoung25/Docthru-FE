import React from 'react'

function ApprovePendingChip() {
  return (
    <div className='border border-[1px] border-gray-300 flex items-center justify-center w-[66px] h-[26px] bg-[#FFFDE7] rounded-[4px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[10px]'>
      <span className='text-[#F2BC00] font-semibold text-[13px] leading-4.5'>승인 대기</span>
    </div>
  )
}

export default ApprovePendingChip