"use client";

import BtnText from "@/components/btn/text/BtnText";
import React, { useState } from "react";
import Input from "./_components/Input";
import CategoryClosed from "@/components/dropDown/category/CategoryClosed";
import CategoryItems from "@/components/dropDown/category/CategoryItems";
import { postChallenges } from "@/lib/api/challenge-api/createChallenge";
import { useRouter } from "next/navigation";
import { getServerSideToken } from "@/lib/actions/auth";
import { isValidURL } from "@/lib/utils/verifyUrlForm";
import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";

const useCreateChallenge = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData) => {
      const accessToken = getServerSideToken("accessToken");
      const formatDeadline = new Date(formData.deadline).toISOString();

      const postData = {
        accessToken,
        title: formData.title,
        originalUrl: formData.originalUrl,
        maxParticipant: formData.maxParticipant,
        description: formData.description,
        deadline: formatDeadline,
        category: formData.selectedCategory,
        docType: formData.selectedDocType
      };

      return await postChallenges(postData);
    },

    onSuccess: (data) => {
      const challengeId = data?.createdChallenge?.id;
      if (challengeId) {
        router.push(`/challenges/my/apply`);
      }
    },

    onError: (error) => {
      console.log("챌린지 생성 실패", error);
    }
  });
};

export default function page() {
  const [isCategory, setIsCategory] = useState(false);
  const [isDocType, setIsDocType] = useState(false);
  const { mutate: createChallenge, isPending } = useCreateChallenge();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange", // 입력값이 바뀔 때마다 유효성 검사
    defaultValues: {
      title: "",
      originalUrl: "",
      maxParticipant: "",
      description: "",
      deadline: "",
      selectedCategory: "카테고리",
      selectedDocType: "카테고리"
    }
  });

  const onSubmit = (postData) => {
    if (!isValidURL(postData.originalUrl)) {
      alert("원문 링크 형식이 올바르지 않습니다.");
      return;
    }

    if (postData.selectedCategory === "카테고리" || postData.selectedDocType === "카테고리") {
      alert("카테고리를 선택해주세요.");
      return;
    }

    createChallenge(postData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-pretendard mx-auto max-w-[590px] px-[16px] pt-[16px] pb-[87px] text-[18px] text-[var(--color-gray-900)]"
    >
      <div className="font-bold">신규 챌린지 신청</div>

      <div className="flex flex-col gap-[24px] pt-[16px] pb-[24px] text-[14px]">
        <div>
          <Input
            title={"제목"}
            placeholder={"제목을 입력해주세요"}
            hasError={!!errors.title}
            {...register("title", { required: "제목은 필수 항목입니다." })}
          />
          {errors.title && <p className="pt-2 pl-[15px] text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Input
            title={"원문 링크"}
            placeholder={"원문 링크를 입력해주세요"}
            hasError={!!errors.originalUrl}
            {...register("originalUrl", {
              required: "원문 링크는 필수입니다.",
              validate: (value) => isValidURL(value) || "올바른 URL을 입력해주세요."
            })}
          />
          {errors.originalUrl && <p className="pt-2 pl-[15px] text-red-500">{errors.originalUrl.message}</p>}
        </div>

        <div className="flex h-full flex-col gap-[8px]">
          <div className="flex flex-col gap-[24px] text-sm font-medium text-[var(--color-gray-900)]">
            <div>
              분야
              <CategoryClosed
                isOpen={isCategory}
                onClick={() => {
                  setIsCategory((prev) => !prev);
                }}
                label={watch("selectedCategory")}
                hasError={!!errors.selectedCategory}
              />
              {isCategory ? (
                <CategoryItems
                  toggleType={"fields"}
                  onSelect={(selected) => {
                    setValue("selectedCategory", selected);
                    trigger("selectedCategory");
                    setIsCategory(false);
                  }}
                />
              ) : null}
              <input
                type="hidden"
                {...register("selectedCategory", {
                  validate: (value) => value !== "카테고리" || "카테고리를 선택해주세요."
                })}
              />
              {errors.selectedCategory && (
                <p className="pt-2 pl-[15px] text-red-500">{errors.selectedCategory.message}</p>
              )}
            </div>
            <div>
              문서 타입
              <CategoryClosed
                isOpen={isDocType}
                onClick={() => {
                  setIsDocType((prev) => !prev);
                }}
                label={watch("selectedDocType")}
                hasError={!!errors.selectedDocType}
              />
              {isDocType ? (
                <CategoryItems
                  toggleType={"docs"}
                  onSelect={(selected) => {
                    setValue("selectedDocType", selected);
                    setIsDocType(false);
                  }}
                />
              ) : null}
              <input
                type="hidden"
                {...register("selectedDocType", {
                  validate: (value) => value !== "카테고리" || "문서 타입을 선택해주세요."
                })}
              />
              {errors.selectedDocType && (
                <p className="pt-2 pl-[15px] text-red-500">{errors.selectedDocType.message}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <Input
            type={"date"}
            deadline={watch("deadline")}
            hasError={!!errors.deadline}
            setDeadline={(val) => {
              setValue("deadline", val);
              trigger("deadline");
            }}
          />
          <input
            type="hidden"
            {...register("deadline", {
              required: "마감일을 선택해주세요."
            })}
          />
          {errors.deadline && <p className="pt-2 pl-[15px] text-red-500">{errors.deadline.message}</p>}
        </div>
        <div>
          <Input
            title={"최대 인원"}
            placeholder={"인원을 입력해주세요"}
            hasError={!!errors.maxParticipant}
            {...register("maxParticipant", {
              required: "인원 수를 입력해주세요.",
              valueAsNumber: true,
              validate: (value) => (value > 0 && value <= 99) || "참여자는 1~99명 사이여야 합니다."
            })}
          />
          {errors.maxParticipant && <p className="pt-2 pl-[15px] text-red-500">{errors.maxParticipant.message}</p>}
        </div>
        <div>
          <Input
            title={"내용"}
            placeholder={"내용을 입력해주세요"}
            height={"h-[219px]"}
            hasError={!!errors.description}
            {...register("description", { required: "내용을 입력해주세요." })}
          />
          {errors.description && <p className="pl-[15px] text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      <BtnText theme="solidblack" className="h-[48px] w-full" disabled={isPending} type="submit">
        {isPending ? (
          <div className="flex items-center justify-center">
            <ClipLoader color="#fff" size={20} />
            <span className="ml-2">신청 중...</span>
          </div>
        ) : (
          "신청하기"
        )}
      </BtnText>
    </form>
  );
}
