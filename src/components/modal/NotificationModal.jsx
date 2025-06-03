"use client";

import React, { useEffect, useRef } from "react";
import closeIcon from "@/assets/icon/ic_out.svg";
import Image from "next/image";
import { updateIsReadAction } from "@/lib/actions/notification";

export default function NotificationModal({ notifications = [], onClose, buttonRef, onNotificationRead }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(
      2,
      "0"
    )}`;
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await updateIsReadAction(notificationId);
      onNotificationRead();
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  return (
    <div
      className="rounded-0 fixed top-0 left-0 z-50 flex h-screen w-screen sm:right-0 md:absolute md:top-[53px] md:right-[50px] md:h-[465px] md:w-[343px] md:justify-end md:rounded-lg"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="h-full w-full border-2 border-gray-200 bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-gray-800">알림</div>
          <button onClick={onClose}>
            <Image src={closeIcon} alt="알림 닫기" width={24} height={24} className="md:hidden" />
          </button>
        </div>
        <div className="max-h-full overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
          <ul>
            {notifications.length === 0 ? (
              <li className="py-8 text-center text-sm text-gray-400">알림이 없습니다.</li>
            ) : (
              notifications.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer border-b border-gray-200 py-3 last:border-b-0 hover:bg-gray-50"
                  onClick={() => handleNotificationClick(item.id)}
                >
                  <div className="mb-2 text-sm font-normal text-gray-800">{item.message}</div>
                  <div className="text-sm font-normal text-gray-400">
                    {item.createdAt ? formatDate(item.createdAt) : "날짜"}
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
