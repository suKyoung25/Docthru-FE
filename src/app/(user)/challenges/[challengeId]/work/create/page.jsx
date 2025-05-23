"use client";

import Container from "@/components/container/PageContainer";
import EditorHeader from "../_components/EditorHeader";
import EditorSection from "../_components/EditorSection";
import { useEffect, useRef, useState } from "react";
import BtnText from "@/components/btn/text/BtnText";
import outCircle from "@/assets/icon/ic_out_circle.svg";
import Image from "next/image";
import DraftModal from "@/components/modal/DraftModal";
import originalPageModalBtn from "@/assets/icon/ic_list.svg";
import OriginalPageModal from "../_components/OriginalPageModal";

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
      {!isOriginalPageModal ? (
        <button
          className="fixed top-[117px] right-0 z-10 rounded-tl-full rounded-bl-full border border-gray-100 bg-white py-3.5 pr-2 pl-3.5 shadow-md sm:top-[123px] md:rounded-tl-3xl md:rounded-bl-3xl md:py-5 md:pr-3 md:pl-4"
          onClick={onOpenOriginalPageModal}
        >
          <div className="flex items-center gap-2 md:flex-col">
            <Image
              src={originalPageModalBtn}
              alt="원본 on/off 모달"
              className="h-6 w-6"
            />
            <span className="text-[16px] font-semibold text-gray-500">
              원문
            </span>
          </div>
        </button>
      ) : (
        <button
          className="fixed top-[117px] right-0 rounded-tl-full rounded-bl-full border border-gray-100 bg-white py-3.5 pr-2 pl-3.5 shadow-md sm:top-[123px] md:rounded-tl-3xl md:rounded-bl-3xl md:py-5 md:pr-3 md:pl-4"
          onClick={onOpenOriginalPageModal}
        >
          <div className="flex items-center gap-2 md:flex-col">
            <Image
              src={originalPageModalBtn}
              alt="원본 on/off 모달"
              className="h-6 w-6"
            />
            <span className="text-[16px] font-semibold text-gray-500">
              원문
            </span>
          </div>
        </button>
      )}

      {/* 원문 모달 */}
      {isOriginalPageModal ? (
        <OriginalPageModal
          pageUrl={originalPageUrl}
          onClose={onCloseOriginalPageModal}
          modalState={isOriginalPageModal}
        />
      ) : (
        <OriginalPageModal
          pageUrl={originalPageUrl}
          onClose={onCloseOriginalPageModal}
          modalState={isOriginalPageModal}
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

      {hasDraft && (
        <div className="fixed bottom-6 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-4">
          <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-50 px-2 py-2">
            <div className="flex items-center gap-2">
              <button onClick={() => setHasDraft(false)}>
                <Image src={outCircle} alt="모달닫기" className="h-6 w-6" />
              </button>
              <span className="text-[14px] font-semibold">
                임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?
              </span>
            </div>

            <BtnText
              theme="solidblack"
              className="h-[32px] max-w-[90px] rounded-xl py-2"
              onClick={onDraftModal}
            >
              불러오기
            </BtnText>
          </div>
        </div>
      )}

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
