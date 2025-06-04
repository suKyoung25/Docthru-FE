"use client";

import dropdownIcon from "@/assets/icon/ic_menu.svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CancelDropdown from "@/components/dropDown/list/CancelDropdown";
import { categoryChipMap, typeChipMap } from "@/components/chip/chipMaps";
import { useAuth } from "@/providers/AuthProvider";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import { userService } from "@/lib/service/userService";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/FailedChallengeModal";
import DeclineModal from "@/components/modal/DeclineModal";
import { deleteChallengeAction } from "@/lib/actions/admin";
import { useQueryClient } from "@tanstack/react-query";
import SuccessModal from "@/components/modal/SuccessModal";

export default function ChallengeContent({
  challengeId,
  title,
  description,
  category,
  docType,
  adminStatus,
  isClosed
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  console.log("isClosed", isClosed);

  const deleteChallenge = async () => {
    try {
      await userService.deleteChallenge(challengeId);
      router.push("/challenges/my/apply");
      setisModalOpen(false);
    } catch (error) {
      console.error("챌린지 삭제 실패: ", error);
      setisModalOpen(false);

      setErrorMessage("완료된 챌린지는 취소가 불가능합니다.");
      setErrorModalOpen(true);
      setIsDropdownOpen(false);
    }
  };

  const handleEdit = () => {
    if (isClosed) {
      setErrorMessage("완료된 챌린지는 수정이 불가능합니다.");
      setErrorModalOpen(true);
      setIsAdminDropdownOpen(false);
      return;
    }

    router.push(`/admin/challenges/${challengeId}/edit`);
  };

  const handleDelete = () => {
    if (isClosed) {
      setErrorMessage("완료된 챌린지는 삭제가 불가능합니다.");
      setErrorModalOpen(true);
      setIsAdminDropdownOpen(false);

      return;
    }

    setIsDeclineModalOpen(true);
  };

  const handleConfirmDelete = async (adminMessage) => {
    try {
      await deleteChallengeAction(challengeId, adminMessage);

      queryClient.invalidateQueries({ queryKey: ["challenges"] });

      setShowModal(true);
    } catch (error) {
      console.error("챌린지 삭제 실패:", error);
      setErrorMessage("완료된 챌린지는 삭제가 불가능합니다.");
      setErrorModalOpen(true);
    } finally {
      setIsDeclineModalOpen(false);
    }
  };

  // 외부 클릭 시 드롭다운 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
        {user?.role === "ADMIN" && (
          <div ref={dropdownRef}>
            <button onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}>
              <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
            </button>
            {isAdminDropdownOpen && (
              <div className="absolute top-4 right-0 z-10 mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-lg">
                <button
                  onClick={handleEdit}
                  className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                >
                  수정하기
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                >
                  삭제하기
                </button>
              </div>
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
      <div className="flex flex-wrap gap-2">
        {categoryChipMap[category] ?? null}
        {typeChipMap[docType] ?? null}
      </div>
      <p className="text-sm font-medium text-gray-700 md:text-base">{description}</p>
      <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} title={errorMessage}>
        {errorMessage}
      </Modal>
      {isDeclineModalOpen && (
        <DeclineModal
          text="삭제"
          onClose={() => {
            setIsDeclineModalOpen(false);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showModal && (
        <SuccessModal
          text="삭제가 완료되었습니다!"
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </article>
  );
}
