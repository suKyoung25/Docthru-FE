import React from "react";

function ApplyDropdown() {
  return (
    <div>
      <div className="flex flex-col bg-white w-35 h-10 border-gray-300 border items-center rounded-lg">
        <div className="flex justify-start items-center  bg-white w-35 h-10 border-gray-300 border p-4 rounded-t-lg">
          <div className="text-[#A3A3A3] text-sm md:text-base">승인 대기</div>
        </div>
        <div className="flex bg-white w-35 h-10 border-gray-300 border justify-start items-center p-4">
          <div className="text-[#A3A3A3] text-sm md:text-base">신청 승인</div>
        </div>
        <div className="flex justify-start bg-white w-35 h-10 border-gray-300 border items-center p-4">
          <div className="text-[#A3A3A3] text-sm md:text-base">신청 거절</div>
        </div>
        <div className="flex justify-start bg-white w-35 h-10 border-gray-300 border items-center p-4">
          <div className="text-[#A3A3A3] text-sm md:text-base">신청 시간 빠른순</div>
        </div>
        <div className="flex justify-start bg-white w-35 h-10 border-gray-300 border items-center p-4">
          <div className="text-[#A3A3A3] text-sm md:text-base">신청 시간 느린순</div>
        </div>
        <div className="flex justify-start bg-white w-35 h-10 border-gray-300 border items-center p-4">
          <div className="text-[#A3A3A3] text-sm md:text-base">마감 기한 빠른순</div>
        </div>
        <div className="flex justify-start bg-white w-35 h-10 border-gray-300 border items-center p-4 rounded-b-lg">
          <div className="text-[#A3A3A3] text-sm md:text-base">마감 기한 느린순</div>
        </div>
      </div>
    </div>
  );
}

export default ApplyDropdown;
