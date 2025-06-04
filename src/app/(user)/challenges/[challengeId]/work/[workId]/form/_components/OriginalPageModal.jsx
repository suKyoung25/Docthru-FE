import Image from "next/image";
import React from "react";
import outCircle from "@/assets/icon/ic_out_circle.svg";
import BtnText from "@/components/btn/text/BtnText";

export default function OriginalPageModal({ originalPageUrl, onClose, modalState }) {
  const containerClass = modalState
    ? "fixed top-0 right-0 z-1 flex h-[350px] w-full flex-col transition-all duration-300 md:h-full md:w-[300px] 2xl:w-[640px]"
    : "fixed top-[-350px] right-0 z-1 flex h-[350px] w-full flex-col md:top-0 md:right-[-300px] md:h-full md:w-[300px] 2xl:right-[-640px] 2xl:w-[640px]";

  const isValidUrl = originalPageUrl?.trim();

  return (
    <div className={containerClass}>
      <div className="flex h-[48px] items-center justify-between gap-2 bg-gray-800/50 px-4 py-2">
        <button onClick={onClose}>
          <Image src={outCircle} alt="모달닫기" className="h-8 w-8" />
        </button>
        <BtnText
          theme="link"
          className="h-[32px]"
          onClick={() => {
            if (isValidUrl) window.open(originalPageUrl, "_blank");
          }}
        >
          링크 열기
        </BtnText>
      </div>

      {isValidUrl ? (
        <iframe
          src={originalPageUrl}
          title="원문 페이지"
          className="h-full w-full border-0"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">원문 페이지를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
