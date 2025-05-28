"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteWorkAction, getWorkDetailAction, updateWorkAction } from "@/lib/actions/work";

export const useWorkData = (challengeId, updateModalState) => {
  const router = useRouter();

  // 에디터 핵심 상태
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 작업물 메타 정보
  const [workMeta, setWorkMeta] = useState({
    workId: null,
    challengeTitle: "",
    originalUrl: ""
  });

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // TODO: 테스트 ID는 실제 매개변수로 교체 필요
        // const response = await getWorkDetailAction(challengeId, workMeta.workId);
        const response = await getWorkDetailAction(15, 67);
        if (response?.data) {
          setWorkMeta({
            workId: response.data.workId,
            challengeTitle: response.data.challengeTitle,
            originalUrl: response.data.originalUrl
          });
          setContent(response.data.content);
          setIsSubmitted(response.data.content === "");
        }
      } catch (error) {
        console.error("작업물 상세 조회 실패:", error.message);
      }
    };

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
      // await updateWorkAction(workMeta.workId, payload);
      await updateWorkAction(67, payload);
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
      // const result = await deleteWorkAction(workMeta.workId);
      const result = await deleteWorkAction(67);
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
    handleDeleteWork
  };
};
