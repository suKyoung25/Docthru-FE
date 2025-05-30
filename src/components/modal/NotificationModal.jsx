"use client";

import React, { useEffect, useRef } from "react";
import closeIcon from "@/assets/icon/ic_out.svg";
import Image from "next/image";

export default function NotificationModal({ notifications = [], onClose, buttonRef }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose(); // 모달 내부, 알림 버튼의 경우 외부로 인식 방지
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end sm:top-[53px] sm:right-18" //위치는 사용하는 곳에서 조정해서 사용
      onClick={onClose} //모달 바깥영역 눌렀을 때 모달창 닫힘
    >
      <div
        ref={modalRef}
        className="h-[465px] w-[343px] rounded-lg border-2 border-gray-200 bg-white p-4 shadow-xl max-sm:h-full max-sm:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-gray-800">알림</div>
          <button onClick={onClose}>
            <Image src={closeIcon} alt="알림 닫기" width={24} height={24} className="sm:hidden" />
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
          <ul>
            {notifications.length === 0 ? (
              <li className="py-8 text-center text-sm text-gray-400">알림이 없습니다.</li>
            ) : (
              notifications.map((item) => (
                <li key={item.id} className="border-b border-gray-200 py-3 last:border-b-0">
                  <div className="mb-2 text-sm font-normal text-gray-800">{item.message}</div>
                  <div className="text-sm font-normal text-gray-400">{item.date}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>,
  );
}
