"use client";

import Container from "@/components/container/PageContainer";
import EditorSection from "./_components/EditorSection";
import DraftModal from "@/components/modal/DraftModal";
import OriginalPageModal from "./_components/OriginalPageModal";
import DraftCheckModal from "./_components/DraftCheckModal";
import OriginalPageModalBtn from "./_components/OriginalPageModalBtn";

import { useEffect, useRef, useState } from "react";
import workService from "@/lib/api/workService";
import { useParams, useRouter } from "next/navigation";
import DeletedModal from "./_components/DeletedModal";
import EditorHeader from "./_components/EditorHeader";

export default function page() {
  const timeoutRef = useRef(null);
  const { challengeId, workId } = useParams();
  const router = useRouter();

  // 작업물 관련 상태
  const [workData, setWorkData] = useState({
    workId: null,
    challengeTitle: "",
    content: "",
    originalUrl: "",
    author: {
      authorId: "",
      authorNickname: ""
    },
    createdAt: null,
    updatedAt: null,
    likeCount: 0,
    isLiked: false
  });

  // 제출 여부 확인
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 드래프트 관련 상태
  const [hasDraft, setHasDraft] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftModal, setDraftModal] = useState(false);

  // 모달 상태
  const [isOriginalPageModal, setIsOriginalPageModal] = useState(false);

  // 작업물 삭제 여부 확인
  const [isDeleted, setIsDeleted] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await workService.getWorkDetail();
      if (response.data) {
        setWorkData(response.data);
        setIsSubmitted(response.data.content === "" ? true : false);
      }
    };
    fetchInitialData();
  }, []);

  // 현재 draft 가 존재하면 isDraft 를 true 로 설정
  useEffect(() => {
    const localDraft = localStorage.getItem("draft");
    if (localDraft?.length > 0) {
      setHasDraft(true);
    }
  }, []);

  // 임시저장 모달 토글
  const toggleDraftModal = () => {
    setDraftModal((prev) => !prev);
    // 모달이 열릴 때는 hasDraft를 false로 설정
    if (!draftModal) {
      setHasDraft(false);
    }
  };

  // 임시저장 불러오기
  const onLoadItem = (item) => {
    setWorkData((prev) => ({
      ...prev,
      content: item.content
    }));
  };

  // 임시저장 로직
  const onDraft = (challengeTitle, content) => {
    setIsDrafting(true);

    const oldDraft = localStorage.getItem("draft");
    const currentWorkId = workData.workId;

    const newDraftItem = {
      id: currentWorkId,
      title: challengeTitle,
      content,
      createdAt: new Date().toISOString()
    };

    if (oldDraft) {
      const parsedDraft = JSON.parse(oldDraft);
      const drafts = Array.isArray(parsedDraft) ? parsedDraft : [];

      // workId가 존재하는 경우 해당 항목 찾기
      const existingDraftIndex = drafts.findIndex((draft) => draft.id === currentWorkId);

      if (existingDraftIndex !== -1) {
        // 기존 항목 업데이트
        drafts[existingDraftIndex] = {
          ...drafts[existingDraftIndex],
          ...newDraftItem
        };
      } else {
        // 새로운 항목 추가
        drafts.push(newDraftItem);
      }

      localStorage.setItem("draft", JSON.stringify(drafts));
    } else {
      localStorage.setItem("draft", JSON.stringify([newDraftItem]));
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsDrafting(false);
    }, 800);
  };

  // 원문 모달 토글
  const toggleOriginalPageModal = () => {
    setIsOriginalPageModal((prev) => !prev);
  };

  // 제출 및 수정
  const onSubmit = async () => {
    try {
      // 테스트 코드 작성함 현재는 서버에서 직접 작업물을 생성후 작업물 아이디를 넣어서 테스트 가능
      // const submitResult = await workService.updateWork(workData.workId, workData.content);
      const submitResult = await workService.updateWork(65, workData.content);
      console.log("제출할 content:", workData.content);
      console.log("작업물 업데이트 결과:", submitResult);
    } catch (error) {
      console.error("작업물 업데이트 실패:", error);
    }
  };

  // 포기하기 모달 버튼
  const onDiscardModal = () => {
    setIsDeleted((prev) => !prev);
  };

  // 작업물 포기(삭제)
  const onDiscard = async () => {
    // const deleteResult = await workService.deleteWork(workData.workId);
    const deleteResult = await workService.deleteWork(65);

    // 삭제시 해당 챌린지 페이지로 이동
    if (deleteResult.status === 204) {
      router.push(`/challenges/${challengeId}`);
    }
  };

  return (
    <div className="relative">
      <OriginalPageModalBtn
        isOriginalPageModal={isOriginalPageModal}
        onOpenOriginalPageModal={toggleOriginalPageModal}
      />

      {isOriginalPageModal ? (
        <OriginalPageModal
          pageUrl={workData.originalUrl}
          onClose={toggleOriginalPageModal}
          modalState={isOriginalPageModal}
          originalPageUrl={workData.originalUrl}
        />
      ) : (
        <OriginalPageModal
          pageUrl={workData.originalUrl}
          onClose={toggleOriginalPageModal}
          modalState={isOriginalPageModal}
          originalPageUrl={workData.originalUrl}
        />
      )}

      {isOriginalPageModal ? (
        <Container
          maxWidth="max-w-4xl"
          className="mt-[350px] transition-all duration-300 sm:mt-0 sm:mr-[300px] xl:mr-[640px]"
        >
          <EditorHeader
            workId={workId}
            challengeTitle={workData.challengeTitle}
            content={workData.content}
            onDraft={onDraft}
            isSubmitted={isSubmitted}
            onSubmit={onSubmit}
            onDiscardModal={onDiscardModal}
          />
          <EditorSection
            challengeTitle={workData.challengeTitle}
            content={workData.content}
            handleContent={(newContent) => setWorkData((prev) => ({ ...prev, content: newContent }))}
            onDraft={onDraft}
            isDrafting={isDrafting}
          />
        </Container>
      ) : (
        <Container maxWidth="max-w-4xl">
          <EditorHeader
            workId={workId}
            challengeTitle={workData.challengeTitle}
            content={workData.content}
            onDraft={onDraft}
            isSubmitted={isSubmitted}
            onSubmit={onSubmit}
            onDiscardModal={onDiscardModal}
          />
          <EditorSection
            challengeTitle={workData.challengeTitle}
            content={workData.content}
            handleContent={(newContent) => setWorkData((prev) => ({ ...prev, content: newContent }))}
            onDraft={onDraft}
            isDrafting={isDrafting}
          />
        </Container>
      )}

      {hasDraft && <DraftCheckModal setHasDraft={setHasDraft} onDraftModal={toggleDraftModal} />}
      {draftModal && <DraftModal onClose={toggleDraftModal} isLoggedIn={true} onLoadItem={onLoadItem} />}
      {isDeleted && <DeletedModal onClose={onDiscardModal} onConfirm={onDiscard} />}
    </div>
  );
}
