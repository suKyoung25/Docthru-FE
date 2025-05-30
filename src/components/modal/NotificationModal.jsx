"use client";
import Image from "next/image";
import React from "react";
import out from "@/assets/icon/ic_out.svg";

export default function NotificationModal({ notifications = [], onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center sm:hidden" onClick={onClose}>
        <div className="h-full w-full bg-white px-4 py-6" onClick={(e) => e.stopPropagation()}>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-base font-semibold text-gray-800">알림</div>
            <Image src={out} width={24} height={24} alt="out" />
          </div>
          <div className="h-[calc(100%-60px)] overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
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
      </div>
      {/* 모바일 아닐 때는 기존 모달 */}
      <div className="absolute top-[calc(100%+12px)] right-[calc(100%-34px)] z-50 hidden h-[465px] w-[343px] rounded-lg border-2 border-gray-200 bg-white p-4 shadow-xl sm:block">
        <div className="mb-3 text-base font-semibold text-gray-800">알림</div>
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
    </>
  );
}
