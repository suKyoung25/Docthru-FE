"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/img/img_logo.svg";
import notiOff from "@/assets/icon/ic_noti_off.svg";
import notiOn from "@/assets/icon/ic_noti_on.svg";
import member from "@/assets/img/profile_member.svg";
import admin from "@/assets/img/profile_admin.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Gnb({ isNoti, userRole }) {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between px-4 sm:px-6 md:h-15 lg:px-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={logo}
            alt="Docthur 로고"
            width={80}
            height={18}
            className="md:h-[27px] md:w-[120px]"
          />
        </Link>
        {userRole === "admin" && (
          <>
            <Link
              href="/admin/management"
              className={
                pathname.includes("/management")
                  ? "text-[13px] font-bold md:text-[15px]"
                  : "text-[13px] font-bold text-gray-500 md:text-[15px]"
              }
            >
              챌린지 관리
            </Link>
            <Link
              href="/admin/challenges"
              className={
                pathname.includes("/challenges")
                  ? "text-[13px] font-bold md:text-[15px]"
                  : "text-[13px] font-bold text-gray-500 md:text-[15px]"
              }
            >
              챌린지 목록
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {userRole === "member" && (
          <>
            <button aria-label="알림">
              <Image
                src={isNoti ? notiOn : notiOff}
                alt={isNoti ? "알림 있음 아이콘" : "알림 없음 아이콘"}
                width={24}
                height={24}
              />
            </button>
            <button aria-label="유저 프로필">
              <Image src={member} alt="유저 프로필" width={32} height={32} />
            </button>
          </>
        )}
        {userRole === "admin" && (
          <button aria-label="어드민 프로필">
            <Image src={admin} alt="어드민 프로필" width={32} height={32} />
          </button>
        )}
        {userRole === "guest" && (
          <Link href="/signIn">
            <button
              className="h-8 w-20 rounded-[10px] border text-sm font-semibold md:h-10 md:w-[90x] md:text-base"
              aria-label="로그인"
            >
              로그인
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
