"use client";

import BtnText from "@/components/btn/text/BtnText";
import Logo from "@/layout/_components/Logo";

// 제출하기 or 수정하기 선택 가능
export default function EditorHeader({
  isSubmit = false,
  isUpdate = false,
  challengeTitle,
  content,
}) {
  // TODO : 작업물 CRUD 연동
  const onDiscard = () => {
    console.log("포기하기");
  };

  // 현재 임시 저장이 중복되는 문제가 있음 어떻게 해결해야하나?
  const onDraft = () => {
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

  const onSubmit = () => {
    console.log("제출하기");
  };

  const onUpdate = () => {
    console.log("수정하기");
  };

  return (
    <header className="flex items-center justify-between py-4">
      <Logo />

      <div className="flex gap-2">
        <BtnText
          theme="tonal"
          icon
          className="min-w-[36px] px-3 py-2 sm:min-w-[90px] sm:px-0"
          onClick={onDiscard}
        />

        <BtnText
          theme="outline"
          className="min-w-[90px] px-4 py-2"
          onClick={onDraft}
        >
          임시저장
        </BtnText>

        {isUpdate && (
          <BtnText
            theme="solidblack"
            className="min-w-[90px] px-4 py-2"
            onClick={onUpdate}
          >
            수정하기
          </BtnText>
        )}

        {isSubmit && (
          <BtnText
            theme="solidblack"
            className="min-w-[90px] px-4 py-2"
            onClick={onSubmit}
          >
            제출하기
          </BtnText>
        )}
      </div>
    </header>
  );
}
