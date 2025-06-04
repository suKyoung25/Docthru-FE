"use client";

import Image from "next/image";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import clockIcon from "@/assets/icon/ic_clock.svg";
import usersIcon from "@/assets/icon/ic_person.svg";
import { typeChipMap, categoryChipMap } from "../chip/chipMaps";
import ChipCardStatus from "@/components/chip/chipComplete/ChipCardStatus";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import DeclineModal from "../modal/DeclineModal";
import { deleteChallengeAction } from "@/lib/actions/admin";
import { BtnRoundedWithIcon } from "../btn/text/BtnText";
import SuccessModal from "../modal/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../modal/FailedChallengeModal";

export default function ChallengeCard({
  challengeId,
  title,
  docType,
  category,
  deadline,
  participants,
  maxParticipant,
  variant = "default",
  isAdmin,
  workId,
  isClosed
}) {
  const [status, setStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    if (now > deadlineDate) {
      setStatus("expired");
    } else if (participants >= maxParticipant) {
      setStatus("closed");
    } else {
      setStatus("");
    }
  }, [deadline, maxParticipant, participants]);

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

  const formatDateToPretty = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  const handleEdit = () => {
    if (isClosed) {
      setErrorMessage("완료된 챌린지는 수정이 불가능합니다.");
      setErrorModalOpen(true);
      return;
    }

    router.push(`/admin/challenges/${challengeId}/edit`);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    if (isClosed) {
      setErrorMessage("완료된 챌린지는 삭제가 불가능합니다.");
      setErrorModalOpen(true);
      return;
    }

    setIsDeclineModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleConfirmDelete = async (adminMessage) => {
    try {
      await deleteChallengeAction(challengeId, adminMessage);

      queryClient.invalidateQueries({ queryKey: ["challenges"] });

      router.refresh();
      setShowModal(true);
    } catch (error) {
      console.error("챌린지 삭제 실패:", error);
      setErrorMessage("완료된 챌린지는 삭제가 불가능합니다.");
      setErrorModalOpen(true);
    } finally {
      setIsDeclineModalOpen(false);
    }
  };

  const isComplete = pathname.includes("/complete");
  const isMy = pathname.includes("/my");

  const btnProps = isComplete
    ? {
        theme: "solidwhite",
        iconType: "goToMyWork",
        text: "내 작업물 보기",
        className: "w-6 h-6",
        onClick: () => router.push(`/challenges/${challengeId}/work/${workId}`)
      }
    : isMy
      ? {
          theme: "outline",
          iconType: "continueChallenge",
          text: "도전 계속하기",
          className: "w-[14px] h-[13px]",
          onClick: () => router.push(`/challenges/${challengeId}/work/${workId}/form`)
        }
      : null;

  return (
    <div
      className={`flex flex-col ${variant === "simple" ? "h-auto justify-start" : "justify-between"} ${variant === "simple" ? "mt-4 px-4 md:mt-6 md:px-6" : "rounded-[12px] border-2 border-[var(--color-gray-800)] p-4"} bg-white`}
    >
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-3">
          {status && <ChipCardStatus status={status} />}
          <button
            className="mb-1 text-left text-xl font-semibold text-gray-800 sm:text-[22px]"
            onClick={() => router.push(`/challenges/${challengeId}`)}
          >
            {title}
          </button>
        </div>

        {/* 어드민 드롭다운(수정,삭제) */}
        {isAdmin ? (
          <div ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
            </button>
            {isDropdownOpen && (
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
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {categoryChipMap[category] ?? null}
        {typeChipMap[docType] ?? null}
      </div>

      {variant !== "simple" && (
        <>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 pb-2 text-sm text-gray-500">
            <div className="flex flex-col gap-1 md:flex-row md:gap-2 lg:gap-3">
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
            <div className="items-end">
              {btnProps && (
                <BtnRoundedWithIcon themes={btnProps.theme} iconType={btnProps.iconType} onClick={btnProps.onClick}>
                  {btnProps.text}
                </BtnRoundedWithIcon>
              )}
            </div>
          </div>
        </>
      )}
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
      <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} title={errorMessage}>
        {errorMessage}
      </Modal>
    </div>
  );
}
