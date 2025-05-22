"use client";

import Container from "@/components/container/PageContainer";
import EditorHeader from "../_components/EditorHeader";
import EditorSection from "../_components/EditorSection";
import { useEffect, useState } from "react";
import BtnText from "@/components/btn/text/BtnText";
import outCircle from "@/assets/icon/ic_out_circle.svg";
import Image from "next/image";
import DraftModal from "@/components/modal/DraftModal";

// TODO : 작업물 api 연동 후 챌린지 제목 적용
export default function page() {
  const [isDraft, setIsDraft] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [content, setContent] = useState("");

  // 개발용 임시 데이터
  // useEffect(() => {
  //   const mockDrafts = [
  //     {
  //       id: 1,
  //       title: "챌린지 일정 변경 공지",
  //       content: `
  //         <p><strong>[공지]</strong> 챌린지 일정이 변경되었습니다.</p>
  //         <ul>
  //           <li>시작일: <span style="color: #3B82F6;">2024.06.01</span></li>
  //           <li>종료일: <span style="color: #EF4444;">2024.06.30</span></li>
  //         </ul>
  //         <p>내용 확인 부탁드립니다.</p>
  //       `,
  //       createdAt: new Date().toISOString(),
  //     },
  //     {
  //       id: 2,
  //       title: "챌린지 참여 가이드",
  //       content: `
  //         <h2>🔥 도전 목표</h2>
  //         <p>하루에 한 번 꼭 인증 사진을 업로드해주세요.</p>
  //         <p>성공 조건: <strong>주 5회 이상 활동</strong></p>
  //         <p style="text-align: right; color: #A855F7;">열심히 도전해봅시다!</p>
  //       `,
  //       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
  //     },
  //   ];

  //   localStorage.setItem("draft", JSON.stringify(mockDrafts));
  // }, []);

  // 현재 draft 가 존재하면 isDraft 를 true 로 설정
  useEffect(() => {
    const localDraft = localStorage.getItem("draft");
    if (localDraft) {
      setIsDraft(true);
    }
  }, []);

  const onDraftModal = () => {
    setDraftModal((prev) => !prev);
    setIsDraft(false);
  };

  const onCloseDraftModal = () => {
    setDraftModal(false);
  };

  const onLoadItem = (item) => {
    setContent(item.content);
  };

  const handleContent = (content) => {
    setContent(content);
  };

  // 현재 임시 저장이 중복되는 문제가 있음 어떻게 해결해야하나?
  const onDraft = (challengeTitle, content) => {
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
  };

  return (
    <div className="relative">
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
          handleContent={handleContent}
          onDraft={onDraft}
        />
      </Container>
      {isDraft && (
        <div className="fixed bottom-6 left-1/2 w-full max-w-4xl -translate-x-1/2 px-4">
          <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-50 px-2 py-2">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsDraft(false)}>
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
