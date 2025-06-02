"use client";

import Container from "@/components/container/PageContainer";
import EditorSection from "./_components/EditorSection";
import DraftModal from "@/components/modal/DraftModal";
import OriginalPageModal from "./_components/OriginalPageModal";
import DraftCheckModal from "./_components/DraftCheckModal";
import OriginalPageModalBtn from "./_components/OriginalPageModalBtn";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import EditorHeader from "./_components/EditorHeader";

import { useParams, useRouter } from "next/navigation";
import { useDraft } from "@/hooks/work/useDraft";
import { useModalControl } from "@/hooks/work/useModalControl";
import { useWorkData } from "@/hooks/work/useWorkData";
import RedirectNoticeModal from "@/components/modal/RedirectNoticeModal";

export default function page() {
  const router = useRouter();

  const { challengeId, workId } = useParams();

  const { modalState, updateModalState } = useModalControl();
  const {
    content,
    setContent,
    workMeta,
    isClosed,
    isLoading,
    isError,
    isSubmitted,
    handleUpdateWork,
    handleDeleteWork
  } = useWorkData(challengeId, workId, updateModalState);
  const { draftState, updateDraftState, toggleDraftModal, saveDraft, loadDraft } = useDraft(workId, setContent);

  return (
    <div className="relative">
      {/* 에디터 */}
      <Container
        maxWidth="max-w-4xl"
        className={
          modalState.isOriginalPageOpen
            ? "mt-[350px] transition-all duration-300 md:mt-0 md:mr-[300px] 2xl:mr-[640px]"
            : ""
        }
      >
        <EditorHeader
          workId={workId}
          challengeTitle={workMeta.challengeTitle}
          content={content}
          onDraft={saveDraft}
          isSubmitted={isSubmitted}
          isSubmitModal={() => updateModalState("isSubmitConfirmOpen", true)}
          onDiscardModal={() => updateModalState("isDeleteConfirmOpen", true)}
        />

        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="mx-auto h-[100px] w-full animate-pulse rounded-md bg-gray-100" />
            <div className="mx-auto h-[700px] w-full animate-pulse rounded-md bg-gray-100" />
          </div>
        ) : (
          <EditorSection
            challengeTitle={workMeta.challengeTitle}
            content={content}
            handleContent={setContent}
            onDraft={saveDraft}
            isDrafting={draftState.isDrafting}
          />
        )}
      </Container>

      {/* 원문 페이지 모달 on/off 버튼 */}
      <OriginalPageModalBtn
        isOriginalPageModal={modalState.isOriginalPageOpen}
        onOpenOriginalPageModal={() => updateModalState("isOriginalPageOpen", !modalState.isOriginalPageOpen)}
      />

      {/* 원문 페이지 모달 */}
      <OriginalPageModal
        originalPageUrl={workMeta.originalUrl}
        onClose={() => updateModalState("isOriginalPageOpen", false)}
        modalState={modalState.isOriginalPageOpen}
      />

      {draftState.hasDraft && (
        <DraftCheckModal setHasDraft={(value) => updateDraftState("hasDraft", value)} onDraftModal={toggleDraftModal} />
      )}

      {draftState.isModalOpen && <DraftModal onClose={toggleDraftModal} isLoggedIn={true} onLoadItem={loadDraft} />}

      {modalState.isDeleteConfirmOpen && (
        <ConfirmActionModal
          text="정말 포기하시겠습니까?"
          onClose={() => updateModalState("isDeleteConfirmOpen", false)}
          onConfirm={handleDeleteWork}
          isLoggedIn={true}
        />
      )}

      {modalState.isSubmitConfirmOpen && (
        <ConfirmActionModal
          text={`${isSubmitted ? "제출" : "수정"}하시겠습니까?`}
          onClose={() => updateModalState("isSubmitConfirmOpen", false)}
          onConfirm={() => {
            handleUpdateWork();
            updateModalState("isContinue", true);
          }}
          isLoggedIn={true}
        />
      )}

      {modalState.isContinue && (
        <ConfirmActionModal
          text="작업물 수정이 완료되었습니다. 계속 수정하시겠습니까?"
          onClose={() => router.push(`/challenges/${challengeId}`)}
          onConfirm={() => updateModalState("isContinue", false)}
          isLoggedIn={true}
        />
      )}

      {isClosed && (
        <RedirectNoticeModal
          text="이미 종료된 챌린지 입니다."
          buttonText="돌아가기"
          redirectUrl={`/challenges/${challengeId}`}
        />
      )}

      {isError && (
        <RedirectNoticeModal
          text="존재하지 않는 작업물 이거나 작업물 수정 권한이 없습니다. 오류가 지속될 경우 관리자에게 문의해주세요."
          buttonText="돌아가기"
          redirectUrl={`/challenges/${challengeId}`}
        />
      )}
    </div>
  );
}
