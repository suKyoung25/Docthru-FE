"use client";

import Image from "next/image";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import clockIcon from "@/assets/icon/ic_clock.svg";
import usersIcon from "@/assets/icon/ic_person.svg";
import { typeChipMap, categoryChipMap } from "../chip/chipMaps";

import ChipCardStatus from "@/components/chip/chipComplete/ChipCardStatus"; // 좌상단 chip
import { useEffect, useState } from "react";

export default function ChallengeCard({
  title,
  type,
  category,
  deadline,
  participants,
  maxParticipant,
  variant = "default"
}) {
  const [status, setStatus] = useState("");

  //챌린지 상태(status) 계산
  useEffect(() => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    if (participants >= maxParticipant) {
      setStatus("closed");
    } else if (now > deadlineDate) {
      setStatus("expired");
    } else {
      setStatus("");
    }
  }, [deadline, maxParticipant, participants]);

  //날짜 prettier
  const formatDateToPretty = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  return (
    <div
      className={`flex flex-col
  ${variant === "simple" ? "h-auto justify-start" : "h-[227px] justify-between sm:h-[262px] md:h-[225px]"}
  ${variant === "simple" ? "" : "rounded-[12px] border-2 border-[var(--color-gray-800)]"}
  bg-white p-4`}
    >
      <div className="flex items-start justify-between">
        {status ? (
          <ChipCardStatus status={status} />
        ) : (
          <div className="text-xl font-semibold text-gray-800">{title}</div>
        )}

        <button>
          <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
        </button>
      </div>

      {status && <div className="mt-2 text-xl font-semibold text-gray-800">{title}</div>}

      <div className="mt-2 flex flex-wrap gap-2">
        {categoryChipMap[category] ?? null}
        {typeChipMap[type] ?? null}
      </div>

      {variant !== "simple" && (
        <>
          <hr className="my-4 border-gray-200" />

          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Image src={clockIcon} alt="시계" width={16} height={16} />
                <span>{formatDateToPretty(deadline)} 마감</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src={usersIcon} alt="사람" width={16} height={16} />
                <span>
                  {participants}/{maxParticipant}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
