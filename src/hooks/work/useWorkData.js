"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteWorkAction, getWorkFormAction, updateWorkAction } from "@/lib/actions/work";

export const useWorkData = (challengeId, workId, updateModalState) => {
  const router = useRouter();

  // 에디터 핵심 상태
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  // 작업물 메타 정보
  const [workMeta, setWorkMeta] = useState({
    challengeTitle: "",
    originalUrl: ""
  });

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getWorkFormAction(challengeId, workId);
        if (response?.data) {
          setWorkMeta({
            challengeTitle: response.data.challengeTitle,
            originalUrl: response.data.originalUrl
          });
          setContent(response.data.content);
          setIsSubmitted(response.data.content === "");
          setIsClosed(response.data.isClosed);
        }
      } catch (error) {
        if (error.message === "작업물 폼 페이지 조회 실패") {
          console.log("작업물 폼 페이지 조회 실패");
          setIsAuthError(true);
          return;
        }
        console.error("에러 메시지:", error.message);
        setIsError(true);
      }
    };
    setIsLoading(false);

    fetchInitialData();
  }, []);

  // 작업물 업데이트
  const handleUpdateWork = async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const payload = content === "<p></p>" ? "" : content;

      await updateWorkAction(workId, payload);
      updateModalState("isSubmitConfirmOpen", false);
      router.refresh();
    } catch (error) {
      console.error("작업물 업데이트 실패:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 작업물 삭제
  const handleDeleteWork = async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const result = await deleteWorkAction(workId);
      if (result.status === 204) {
        updateModalState("isDeleteConfirmOpen", false);
        router.push(`/challenges/${challengeId}`);
      }
    } catch (error) {
      console.error("작업물 삭제 실패:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    setContent,
    isSubmitted,
    workMeta,
    handleUpdateWork,
    handleDeleteWork,
    isLoading,
    isError,
    isClosed,
    isAuthError
  };
};
