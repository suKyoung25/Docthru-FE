"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import inactiveHeart from "@/assets/icon/ic_inactive_heart.svg";
import activeHeart from "@/assets/icon/ic_active_heart.svg";
import profile from "@/assets/img/profile_member.svg";
import adminProfile from "@/assets/img/profile_admin.svg";
import empty from "@/assets/img/empty.svg";
import { useAuth } from "@/providers/AuthProvider";

export default function Content() {
  const params = useParams();
  const workId = params.workId;
  const [work, setWork] = useState(null);
  const { user } = useAuth();

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

  useEffect(() => {
    if (!workId) return;
    fetchWork();
  }, [workId]);

  const handleLikeClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/like`, {
        method: "POST",
        credentials: "include"
      });
      if (res.ok) {
        await fetchWork();
      } else {
        const error = await res.json();
        alert(error.message || "좋아요에 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 에러:", error);
      alert("좋아요 중 오류가 발생했습니다.");
    }
  };

  const handleUnlikeClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/like`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        await fetchWork();
      } else {
        const error = await res.json();
        alert(error.message || "좋아요 취소 실패");
      }
    } catch (error) {
      console.error("좋아요 취소 에러:", error);
      alert("좋아요 취소 중 오류가 발생했습니다.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="my-4 flex h-12 items-center justify-between border-y border-gray-200 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={work?.author?.authorRole === "ADMIN" ? adminProfile : profile}
              width={24}
              height={24}
              alt="profile"
            />
            <div className="text-xs font-medium text-gray-800">{work?.author?.authorNickname || "닉네임"}</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            {work?.isLiked ? (
              <button onClick={handleUnlikeClick}>
                <Image src={activeHeart} width={16} height={16} alt="active_heart" />
              </button>
            ) : (
              <button onClick={handleLikeClick}>
                <Image src={inactiveHeart} width={16} height={16} alt="inactive_heart" />
              </button>
            )}
            {work?.likeCount || 0}
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500">{work?.createdAt ? formatDate(work.createdAt) : "날짜"}</div>
      </div>
      <div className="mb-6 border-b border-gray-200 pb-10">
        {work?.content || (
          <div className="text-base text-gray-900 flex flex-col justify-center items-center py-30 gap-4 ">
            <Image src={empty} width={320} height={168} alt="empty" />
            아직 아무런 번역을 진행하지 않았어요!
          </div>
        )}
      </div>
    </div>
  );
}
