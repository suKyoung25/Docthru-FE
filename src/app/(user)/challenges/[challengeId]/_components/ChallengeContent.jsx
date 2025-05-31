"use client";

import dropdownIcon from "@/assets/icon/ic_menu.svg";
import Image from "next/image";
import React, { useState } from "react";
import CancelDropdown from "@/components/dropDown/list/CancelDropdown";
import { categoryChipMap, typeChipMap } from "@/components/chip/chipMaps";
import { useAuth } from "@/providers/AuthProvider";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import { userService } from "@/lib/service/userService";
import { useRouter } from "next/navigation";

export default function ChallengeContent({ challengeId, title, description, category, docType, adminStatus }) {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const { user } = useAuth();

  const deleteChallenge = async () => {
    try {
      await userService.deleteChallenge(challengeId);
      router.push("/challenges/my/apply");
      setisModalOpen(false);
    } catch (error) {
      console.error("챌린지 삭제 실패: ", error);
      setisModalOpen(false);

      // TODO : 이건 모달창으로 바꿔주면 좋을듯
      alert("챌린지 삭제 실패");
      router.push("/challenges/my/apply");
    }
  };

  return (
    <article className="flex w-full flex-col gap-4">
      <div className="relative flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">{title}</h2>
        {adminStatus === "PENDING" && user?.role === "USER" && (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
            </button>
            {isDropdownOpen && (
              <CancelDropdown onClick={() => setisModalOpen(true)} className="absolute right-0 mt-3" />
            )}
          </div>
        )}
        {/* TODO: ConfirmActionModal - onConfirm 핸들러 추가 */}
        {isModalOpen && (
          <ConfirmActionModal
            text="정말 취소하시겠어요?"
            onClose={() => setisModalOpen(false)}
            isLoggedIn={true}
            onConfirm={deleteChallenge}
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {categoryChipMap[category] ?? null}
        {typeChipMap[docType] ?? null}
      </div>
      <p className="text-sm font-medium text-gray-700 md:text-base">{description}</p>
    </article>
  );
}
