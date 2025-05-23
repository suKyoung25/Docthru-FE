"use client";

import Container from "@/components/container/PageContainer";
import EditorHeader from "../_components/EditorHeader";
import EditorSection from "../_components/EditorSection";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import DraftModal from "@/components/modal/DraftModal";
import originalPageModalBtn from "@/assets/icon/ic_list.svg";
import OriginalPageModal from "../_components/OriginalPageModal";
import DraftCheckModal from "../_components/DraftCheckModal";
import OriginalPageModalBtn from "../_components/OriginalPageModalBtn";

// TODO : 작업물 api 연동 후 챌린지 제목 적용
export default function page() {
  const timeoutRef = useRef(null);

  const [hasDraft, setHasDraft] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftModal, setDraftModal] = useState(false);

  const [content, setContent] = useState("");

  const [originalPageUrl, setOriginalPageUrl] = useState(
    "https://frontend-fundamentals.com/code-quality/code/",
  );
  const [isOriginalPageModal, setIsOriginalPageModal] = useState(false);

  // 현재 draft 가 존재하면 isDraft 를 true 로 설정
  useEffect(() => {
    const localDraft = localStorage.getItem("draft");
    if (localDraft) {
      setHasDraft(true);
    }
  }, []);

  const onDraftModal = () => {
    setDraftModal((prev) => !prev);
    setHasDraft(false);
  };

  const onCloseDraftModal = () => {
    setDraftModal(false);
  };

  const onLoadItem = (item) => {
    setContent(item.content);
  };

  // 임시저장 로직
  // TODO: 현재 임시 저장이 중복되는 문제가 있음 어떻게 해결해야하나?
  const onDraft = (challengeTitle, content) => {
    setIsDrafting(true);

    const oldDraft = localStorage.getItem("draft");

    const newDraftItem = {
      //  TODO : 추후 챌린지 id 값을 저장시켜 중복을 방지하는 로직 작성하기
      id: Date.now(), // 고유 ID 생성
      title: challengeTitle,
      content,
      createdAt: new Date().toISOString(),
    };

    if (oldDraft) {
      const parsedDraft = JSON.parse(oldDraft);
      // 배열인지 확인하고 처리
      const drafts = Array.isArray(parsedDraft) ? parsedDraft : [];
      drafts.push(newDraftItem);
      localStorage.setItem("draft", JSON.stringify(drafts));
    } else {
      // 새로운 배열로 시작
      localStorage.setItem("draft", JSON.stringify([newDraftItem]));
    }

    // 이전 타이머가 있다면 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      console.log("이전 타이머 제거");
    }

    // 심리적 안정감을 위한 저장중 표시 보여주기 로직
    timeoutRef.current = setTimeout(() => {
      setIsDrafting(false);
    }, 800);
  };

  // 모달 on/off 로직
  const onOpenOriginalPageModal = () => {
    setIsOriginalPageModal(true);
  };

  const onCloseOriginalPageModal = () => {
    setIsOriginalPageModal(false);
  };

  return (
    <div className="relative">
      {/* 원문 모달 버튼 */}
      <OriginalPageModalBtn
        isOriginalPageModal={isOriginalPageModal}
        onOpenOriginalPageModal={onOpenOriginalPageModal}
      />

      {/* 원문 모달 */}
      {isOriginalPageModal ? (
        <OriginalPageModal
          pageUrl={originalPageUrl}
          onClose={onCloseOriginalPageModal}
          modalState={isOriginalPageModal}
          originalPageUrl={originalPageUrl}
        />
      ) : (
        <OriginalPageModal
          pageUrl={originalPageUrl}
          onClose={onCloseOriginalPageModal}
          modalState={isOriginalPageModal}
          originalPageUrl={originalPageUrl}
        />
      )}

      {/* 작업물 작성 컨테이너 */}
      {isOriginalPageModal ? (
        <Container
          maxWidth="max-w-4xl"
          className="mt-[350px] transition-all duration-300 sm:mt-0 sm:mr-[300px] xl:mr-[640px]"
        >
          <EditorHeader
            isSubmit={true}
            content={content}
            challengeTitle="챌린지 제목"
            onDraft={onDraft}
          />
          <EditorSection
            challengeTitle="챌린지 제목"
            content={content}
            handleContent={setContent}
            onDraft={onDraft}
            isDrafting={isDrafting}
          />
        </Container>
      ) : (
        <Container maxWidth="max-w-4xl">
          <EditorHeader
            isSubmit={true}
            content={content}
            challengeTitle="챌린지 제목"
            onDraft={onDraft}
          />
          <EditorSection
            challengeTitle="챌린지 제목"
            content={content}
            handleContent={setContent}
            onDraft={onDraft}
            isDrafting={isDrafting}
          />
        </Container>
      )}

      {/* 임시 저장물이 존재하면 on */}
      {hasDraft && (
        <DraftCheckModal
          setHasDraft={setHasDraft}
          onDraftModal={onDraftModal}
        />
      )}

      {/* 임시 저장물 불러오기를 누르면 저장물 선택 모달 on */}
      {draftModal && (
        <DraftModal
          onClose={onCloseDraftModal}
          isLoggedIn={true}
          onLoadItem={onLoadItem}
        />
      )}
    </div>
  );
}
