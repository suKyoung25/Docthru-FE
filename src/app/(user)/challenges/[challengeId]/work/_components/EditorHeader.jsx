"use client";

import BtnText from "@/components/btn/text/BtnText";
import Logo from "@/layout/_components/Logo";

// 제출하기 or 수정하기 선택 가능
export default function EditorHeader({ isSubmit = false, isUpdate = false }) {
  // TODO : 작업물 CRUD 연동
  const onDiscard = () => {
    console.log("포기하기");
  };

  const onDraft = () => {
    console.log("임시저장");
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
