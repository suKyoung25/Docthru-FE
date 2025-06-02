import BtnText from "@/components/btn/text/BtnText";
import Logo from "@/layout/_components/Logo";

// 제출하기 or 수정하기 선택 가능
export default function EditorHeader({ challengeTitle, content, onDraft, isSubmitted, isSubmitModal, onDiscardModal }) {
  return (
    <header className="flex items-center justify-between py-4">
      <Logo className="h-[18px] w-[80px] md:h-[31px] md:w-[120px]" />

      <div className="flex gap-2">
        <BtnText theme="tonal" icon className="min-w-[36px] px-2 md:min-w-[90px]" onClick={onDiscardModal} />

        <BtnText theme="outline" className="min-w-[90px]" onClick={() => onDraft(challengeTitle, content)}>
          임시저장
        </BtnText>

        {isSubmitted && (
          <BtnText theme="solidblack" className="min-w-[90px]" onClick={isSubmitModal}>
            제출하기
          </BtnText>
        )}

        {!isSubmitted && (
          <BtnText theme="solidblack" className="min-w-[90px]" onClick={isSubmitModal}>
            수정하기
          </BtnText>
        )}
      </div>
    </header>
  );
}
