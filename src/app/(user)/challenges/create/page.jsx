"use client";

import BtnText from "@/components/btn/text/BtnText";
import React, { useState } from "react";
import Input from "./component/Input";
import CategoryClosed from "@/components/dropdown/category/CategoryClosed";
import CategoryItems from "@/components/dropdown/category/CategoryItems";
import { postChallenges } from "@/lib/api/challenges-first/createChallenge";
import { useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [originUrl, setOriginUrl] = useState("");
  const [maxParticipant, setMaxParticipant] = useState("");
  const [content, setContent] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [isDocType, setIsDocType] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  //디버깅 (추후 삭제 필요)
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWIwYWlzeXAwMDAwY2NveWFhem1tbzllIiwiZW1haWwiOiJna3NrdGwxMjNAbmF2ZXIuY29tIiwibmlja25hbWUiOiLrgpjripTslbzrqYvsp4TquIjrtpXslrQiLCJpYXQiOjE3NDgyMzMxNzIsImV4cCI6MTc0ODIzNjc3Mn0.tih1PW0QSDGsBri9rF6XpoBgJsute_PYxq-_D_9XdKE";

  //챌린지 신청하기
  const handlePost = async () => {
    //쿠키에서 토큰 가져오는 함수 추가 필요
    const token = accessToken;

    const postDate = {
      title,
      originUrl,
      maxParticipant,
      content,
      accessToken: token,
    };

    try {
      const createdChallenge = await postChallenges(postDate);

      if (!createdChallenge) throw new Error("챌린지 생성 중 오류 발생");

      const challengeId = createdChallenge.createdChallenge.id;
      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      console.log("챌린지 생성 실패");
    }
  };

  return (
    <div className="font-pretendard px-[16px] pt-[16px] pb-[87px] text-[18px] text-[var(--color-gray-900)]">
      <div className="font-bold">신규 챌린지 신청</div>

      <div className="flex flex-col gap-[24px] pt-[16px] pb-[24px] text-[14px]">
        <Input
          title={"제목"}
          placeholder={"제목을 입력해주세요"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          title={"원문 링크"}
          placeholder={"원문 링크를 입력해주세요"}
          value={originUrl}
          onChange={(e) => setOriginUrl(e.target.value)}
        />
        <div className="flex h-full flex-col gap-[8px]">
          <div className="flex flex-col gap-[24px] text-sm font-medium text-[var(--color-gray-900)]">
            분야
            <CategoryClosed
              isOpen={isCategory}
              onClick={() => {
                setIsCategory((prev) => !prev);
              }}
              label={selectedCategory}
            />
            {isCategory ? (
              <CategoryItems
                toggleType={"fields"}
                onSelect={(selected) => {
                  setSelectedCategory(selected);
                  setIsCategory(false);
                }}
              />
            ) : null}
            문선 타입
            <CategoryClosed
              isOpen={isDocType}
              onClick={() => {
                setIsDocType((prev) => !prev);
              }}
              label={selectedCategory}
            />
            {isDocType ? (
              <CategoryItems
                toggleType={"docs"}
                onSelect={(selected) => {
                  setSelectedCategory(selected);
                  setIsCategory(false);
                }}
              />
            ) : null}
          </div>
        </div>
        <Input
          title={"최대 인원"}
          placeholder={"인원을 입력해주세요"}
          value={maxParticipant}
          onChange={(e) => setMaxParticipant(e.target.value)}
        />
        <Input
          title={"내용"}
          placeholder={"내용을 입력해주세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          height={"h-[219px]"}
        />
      </div>

      <div className="h-[48px] w-full">
        <BtnText
          theme="solidblack"
          onClick={handlePost}
          // icon={} className={} children={}
        >
          신청하기
        </BtnText>
      </div>
    </div>
  );
}
