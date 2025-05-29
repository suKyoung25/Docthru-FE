"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import ApiChip from "@/components/chip/chipType/ApiChip";
import CareerChip from "@/components/chip/chipType/CareerChip";
import ModernJSChip from "@/components/chip/chipType/ModernjsChip";
import WebChip from "@/components/chip/chipType/WebChip";
import BlogChip from "@/components/chip/chipCategory/BlogChip";
import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";
import Menu from "./Menu";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import DeclineModal from "@/components/modal/DeclineModal";
import { deleteChallengeAction } from "@/lib/actions/admin";

const categoryComponentMap = {
  "Next.js": NextjsChip,
  API: ApiChip,
  Career: CareerChip,
  "Modern JS": ModernJSChip,
  Web: WebChip
};

const docTypeComponentMap = {
  블로그: BlogChip,
  공식문서: OfficialDocChip
};

export default function Header() {
  const params = useParams();
  const challengeId = params.challengeId;
  const workId = params.workId;
  const [challenge, setChallenge] = useState(null);
  const [work, setWork] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";
  const isAuthor = work?.authorId === user;

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}`);
        if (!res.ok) throw new Error("챌린지 불러오기 실패");
        const { data } = await res.json();
        setChallenge(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("작업 불러오기 실패");
        const { data } = await res.json();
        setWork(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWork();
  }, [workId]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // 수정
  const handleEdit = () => {
    router.push(`/challenges/${challengeId}/work/${workId}/form`);
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        // 삭제 성공 시, 해당 첼린지 페이지로 이동
        router.push(`/challenges/${challengeId}`);
      }
    } catch (error) {
      console.error("작업물 삭제 에러:", error);
    }
  };

  const handleAdminEdit = () => {
    router.push(`/challenges/${challengeId}/work/${workId}/form`);
    setIsDropdownOpen(false);
  };

  const handleAdminDelete = () => {
    setIsDeclineModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };

  const handleConfirmDelete = async (adminMessage) => {
    try {
      await deleteChallengeAction(challengeId, adminMessage);
      // 삭제 성공 시, 해당 챌린지 페이지로 이동
      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      console.error("챌린지 삭제 실패:", error);
      alert("챌린지 삭제에 실패했습니다: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">{challenge?.title || "Loading..."}</div>
        {isAuthor && <Menu onEdit={handleEdit} onDelete={handleDelete} />}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/*카테고리 칩*/}
          {challenge?.category &&
            categoryComponentMap[challenge.category] &&
            React.createElement(categoryComponentMap[challenge.category])}

          {/*문서 타입 칩*/}
          {challenge?.docType &&
            docTypeComponentMap[challenge.docType] &&
            React.createElement(docTypeComponentMap[challenge.docType])}
        </div>

        {/* 어드민 모달 */}
        {isAdmin ? (
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 z-10 mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-lg">
                <button
                  onClick={handleAdminEdit}
                  className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                >
                  수정하기
                </button>
                <button
                  onClick={handleAdminDelete}
                  className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {isDeclineModalOpen && (
        <DeclineModal text="삭제" onClose={handleCloseDeclineModal} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
}
