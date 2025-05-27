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
import EditorHeader from "./_components/EditorHeader";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";

export default function page() {
  const timeoutRef = useRef(null);
  const { challengeId, workId } = useParams();
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

  // 드래프트 관련 상태
  const [draftState, setDraftState] = useState({
    hasDraft: false,
    isDrafting: false,
    isModalOpen: false
  });

  // 모달 상태 통합 관리
  const [modalState, setModalState] = useState({
    isOriginalPageOpen: false,
    isDeleteConfirmOpen: false,
    isSubmitConfirmOpen: false
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

  // 현재 draft 존재 여부 확인
  useEffect(() => {
    const localDraft = localStorage.getItem("draft");
    if (localDraft?.length > 0) {
      setDraftState((prev) => ({ ...prev, hasDraft: true }));
    }
  }, []);

  // 모달 상태 업데이트 핸들러
  const updateModalState = (modalType, isOpen) => {
    setModalState((prev) => ({
      ...prev,
      [modalType]: isOpen
    }));
  };

  // 드래프트 상태 업데이트 핸들러
  const updateDraftState = (key, value) => {
    setDraftState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // 임시저장 모달 토글
  const toggleDraftModal = () => {
    updateDraftState("isModalOpen", !draftState.isModalOpen);
    if (!draftState.isModalOpen) {
      updateDraftState("hasDraft", false);
    }
  };

  // 임시저장 불러오기
  const onLoadItem = (item) => {
    setContent(item.content);
  };

  // 임시저장 로직
  const onDraft = (challengeTitle, newContent) => {
    if (newContent === "<p></p>") return;

    updateDraftState("isDrafting", true);

    const oldDraft = localStorage.getItem("draft");
    const currentWorkId = workMeta.workId;

    const newDraftItem = {
      id: currentWorkId,
      title: challengeTitle,
      content: newContent,
      createdAt: new Date().toISOString()
    };

    if (oldDraft) {
      const parsedDraft = JSON.parse(oldDraft);
      const drafts = Array.isArray(parsedDraft) ? parsedDraft : [];
      const existingDraftIndex = drafts.findIndex((draft) => draft.id === currentWorkId);

      if (existingDraftIndex !== -1) {
        drafts[existingDraftIndex] = { ...drafts[existingDraftIndex], ...newDraftItem };
      } else {
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
      updateDraftState("isDrafting", false);
    }, 800);
  };

  // 제출 및 수정
  const onSubmit = async () => {
    try {
      const updated = await workService.updateWork(workMeta.workId, content === "<p></p>" ? "" : content);
      updateModalState("isSubmitConfirmOpen", false);
      router.refresh();
    } catch (error) {
      console.error("작업물 업데이트 실패:", error);
    }
  };

  // 작업물 포기(삭제)
  const onDiscard = async () => {
    const deleteResult = await workService.deleteWork(workMeta.workId);
    if (deleteResult.status === 204) {
      router.push(`/challenges/${challengeId}`);
    }
  };

  return (
    <div className="relative">
      {/* 에디터 */}
      <Container
        maxWidth="max-w-4xl"
        className={
          modalState.isOriginalPageOpen
            ? "mt-[350px] transition-all duration-300 sm:mt-0 sm:mr-[300px] xl:mr-[640px]"
            : ""
        }
      >
        <EditorHeader
          workId={workId}
          challengeTitle={workMeta.challengeTitle}
          content={content}
          onDraft={onDraft}
          isSubmitted={isSubmitted}
          isSubmitModal={() => updateModalState("isSubmitConfirmOpen", true)}
          onDiscardModal={() => updateModalState("isDeleteConfirmOpen", true)}
        />
        <EditorSection
          challengeTitle={workMeta.challengeTitle}
          content={content}
          handleContent={setContent}
          onDraft={onDraft}
          isDrafting={draftState.isDrafting}
        />
      </Container>

      {/* 원문 페이지 모달 on/off 버튼 */}
      <OriginalPageModalBtn
        isOriginalPageModal={modalState.isOriginalPageOpen}
        onOpenOriginalPageModal={() => updateModalState("isOriginalPageOpen", !modalState.isOriginalPageOpen)}
      />

      {/* 원문 페이지 모달 */}
      <OriginalPageModal
        pageUrl={workMeta.originalUrl}
        onClose={() => updateModalState("isOriginalPageOpen", false)}
        modalState={modalState.isOriginalPageOpen}
        originalPageUrl={workMeta.originalUrl}
      />

      {draftState.hasDraft && (
        <DraftCheckModal setHasDraft={(value) => updateDraftState("hasDraft", value)} onDraftModal={toggleDraftModal} />
      )}

      {draftState.isModalOpen && <DraftModal onClose={toggleDraftModal} isLoggedIn={true} onLoadItem={onLoadItem} />}

      {modalState.isDeleteConfirmOpen && (
        <ConfirmActionModal
          text="정말 포기하시겠습니까?"
          onClose={() => updateModalState("isDeleteConfirmOpen", false)}
          onConfirm={onDiscard}
          isLoggedIn={true}
        />
      )}

      {modalState.isSubmitConfirmOpen && (
        <ConfirmActionModal
          text={`${isSubmitted ? "제출" : "수정"}하시겠습니까?`}
          onClose={() => updateModalState("isSubmitConfirmOpen", false)}
          onConfirm={onSubmit}
          isLoggedIn={true}
        />
      )}
    </div>
  );
}
