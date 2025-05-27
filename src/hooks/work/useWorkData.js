import { useState, useEffect } from "react";
import workService from "@/lib/api/workService";
import { useRouter } from "next/navigation";

export const useWorkData = (challengeId) => {
  const router = useRouter();

  // 에디터 핵심 상태
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 작업물 메타 정보
  const [workMeta, setWorkMeta] = useState({
    workId: null,
    challengeTitle: "",
    originalUrl: ""
  });

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await workService.getWorkDetail();
      if (response.data) {
        setWorkMeta({
          workId: response.data.workId,
          challengeTitle: response.data.challengeTitle,
          originalUrl: response.data.originalUrl
        });
        setContent(response.data.content);
        setIsSubmitted(response.data.content === "");
      }
    };
    fetchInitialData();
  }, []);

  // 작업물 업데이트
  const updateWork = async () => {
    try {
      await workService.updateWork(workMeta.workId, content === "<p></p>" ? "" : content);
      router.refresh();
      return true;
    } catch (error) {
      console.error("작업물 업데이트 실패:", error);
      return false;
    }
  };

  // 작업물 삭제
  const deleteWork = async () => {
    try {
      const deleteResult = await workService.deleteWork(workMeta.workId);
      if (deleteResult.status === 204) {
        router.push(`/challenges/${challengeId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("작업물 삭제 실패:", error);
      return false;
    }
  };

  return {
    content,
    setContent,
    isSubmitted,
    workMeta,
    updateWork,
    deleteWork
  };
};
