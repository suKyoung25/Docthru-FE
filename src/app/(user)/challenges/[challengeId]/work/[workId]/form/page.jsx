"use client";

import Container from "@/components/container/PageContainer";
import EditorSection from "./_components/EditorSection";
import DraftModal from "@/components/modal/DraftModal";
import OriginalPageModal from "./_components/OriginalPageModal";
import DraftCheckModal from "./_components/DraftCheckModal";
import OriginalPageModalBtn from "./_components/OriginalPageModalBtn";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";

import { useParams } from "next/navigation";
import { useDraft } from "@/hooks/work/useDraft";
import { useModalControl } from "@/hooks/work/useModalControl";
import { useWorkData } from "@/hooks/work/useWorkData";
import EditorHeader from "./_components/EditorHeader";

export default function page() {
  const { challengeId, workId } = useParams();

  const { content, setContent, isSubmitted, workMeta, updateWork, deleteWork } = useWorkData(challengeId);
  const { modalState, updateModalState } = useModalControl();
  const { draftState, updateDraftState, toggleDraftModal, saveDraft } = useDraft(workMeta.workId);

  // 임시저장 불러오기
  const onLoadItem = (item) => {
    setContent(item.content);
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
        {/* 에디터 헤더 */}
        <EditorHeader
          workId={workId}
          challengeTitle={workMeta.challengeTitle}
          content={content}
          onDraft={saveDraft}
          isSubmitted={isSubmitted}
          isSubmitModal={() => updateModalState("isSubmitConfirmOpen", true)}
          onDiscardModal={() => updateModalState("isDeleteConfirmOpen", true)}
        />
        {/* 에디터 메인 */}
        <EditorSection
          challengeTitle={workMeta.challengeTitle}
          content={content}
          handleContent={setContent}
          onDraft={saveDraft}
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

      {/* 임시저장 존재 여부 확인 모달 */}
      {draftState.hasDraft && (
        <DraftCheckModal setHasDraft={(value) => updateDraftState("hasDraft", value)} onDraftModal={toggleDraftModal} />
      )}

      {/* 임시저장 모달 */}
      {draftState.isModalOpen && <DraftModal onClose={toggleDraftModal} isLoggedIn={true} onLoadItem={onLoadItem} />}

      {/* 포기 확인 모달 */}
      {modalState.isDeleteConfirmOpen && (
        <ConfirmActionModal
          text="정말 포기하시겠습니까?"
          onClose={() => updateModalState("isDeleteConfirmOpen", false)}
          onConfirm={deleteWork}
          isLoggedIn={true}
        />
      )}

      {/* 제출 및 수정 확인 모달 */}
      {modalState.isSubmitConfirmOpen && (
        <ConfirmActionModal
          text={`${isSubmitted ? "제출" : "수정"}하시겠습니까?`}
          onClose={() => updateModalState("isSubmitConfirmOpen", false)}
          onConfirm={updateWork}
          isLoggedIn={true}
        />
      )}
    </div>
  );
}
