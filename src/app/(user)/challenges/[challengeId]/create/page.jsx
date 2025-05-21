"use client";

import BtnText from "@/components/btn/text/BtnText";
import Container from "@/components/container/PageContainer";
import Logo from "@/layout/_components/Logo";
import React from "react";
import Editor from "./_components/Editor";

export default function page() {
  return (
    <Container maxWidth="max-w-4xl">
      <header className="flex items-center justify-between py-4">
        <Logo />

        <div className="flex gap-2">
          <BtnText
            theme="tonal"
            icon
            className="min-w-[36px] px-3 py-2 sm:min-w-[90px] sm:px-0"
            onClick={() => {
              console.log("포기하기");
            }}
          />

          <BtnText theme="outline" className="min-w-[90px] px-4 py-2">
            임시저장
          </BtnText>

          <BtnText theme="solidblack" className="min-w-[90px] px-4 py-2">
            수정하기
          </BtnText>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <span className="text-2xl font-bold">
          챌린지 제목 : 추후에 api 개발후 제목 적용
        </span>
        <Editor />
      </div>
    </Container>
  );
}
