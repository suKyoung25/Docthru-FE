"use client";
import React from "react";

export default function NotificationModal({ notifications = [], onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center" //위치는 사용하는 곳에서 조정해서 사용
      onClick={onClose} //모달 바깥영역 눌렀을 때 모달창 닫힘
    >
      <div
        className="h-[465px] w-[343px] rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-base font-semibold text-gray-800">알림</div>
        <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
          <ul>
            {notifications.length === 0 ? (
              <li className="py-8 text-center text-sm text-gray-400">
                알림이 없습니다.
              </li>
            ) : (
              notifications.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-gray-100 py-3 last:border-b-0"
                >
                  <div className="mb-2 text-sm font-normal text-gray-800">
                    {item.message}
                  </div>
                  <div className="text-sm font-normal text-gray-400">
                    {item.date}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
