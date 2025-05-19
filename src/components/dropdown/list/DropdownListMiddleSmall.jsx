import React from 'react'

function DropdownListMiddleSmall() {
  return (
    <div>
      <div className="flex flex-col bg-white w-35 h-10 border-[#E5E5E5] border items-center rounded-lg">
        <div className="flex justify-center items-center  bg-white w-35 h-10 border-[#E5E5E5] border p-4 rounded-t-lg">
          <div className="text-[#A3A3A3] text-[14px]">승인 대기</div>
        </div>
        <div className="flex bg-white w-35 h-10 border-[#E5E5E5] border justify-center items-center p-4">
          <div className="text-[#A3A3A3] text-[14px]">신청 승인</div>
        </div>
        <div className="flex justify-center bg-white w-35 h-10 border-[#E5E5E5] border items-center p-4">
          <div className="text-[#A3A3A3] text-[14px]">신청 거절</div>
        </div>
        <div className="flex justify-center bg-white w-35 h-10 border-[#E5E5E5] border items-center p-4">
          <div className="text-[#A3A3A3] text-[14px]">신청 시간 빠른순</div>
        </div>
        <div className="flex justify-center bg-white w-35 h-10 border-[#E5E5E5] border items-center p-4">
          <div className="text-[#A3A3A3] text-[14px]">신청 시간 느린순</div>
        </div>
        <div className="flex justify-center bg-white w-35 h-10 border-[#E5E5E5] border items-center p-4">
          <div className="text-[#A3A3A3] text-[14px]">마감 기한 빠른순</div>
        </div>
        <div className="flex justify-center bg-white w-35 h-10 border-[#E5E5E5] border items-center p-4 rounded-b-lg">
          <div className="text-[#A3A3A3] text-[14px]">마감 기한 느린순</div>
        </div>

      </div>
    </div>
  )
}

export default DropdownListMiddleSmall