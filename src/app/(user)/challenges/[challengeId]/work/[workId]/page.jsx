import BlogChip from "@/components/chip/chipCategory/BlogChip";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import Container from "@/components/container/PageContainer";
import Image from "next/image";
import React from "react";
import inactiveHeart from "@/assets/icon/ic_inactive_heart.svg";
import activeHeart from "@/assets/icon/ic_active_heart.svg";
import profile from "@/assets/img/profile_member.svg";
import FeedbackBox from "./_components/FeedbackBox";

export default function page() {
  return (
    <Container maxWidth="max-w-4xl">
      <div>
        <div>
          <div className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
            Challenge.title
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NextjsChip />
          <BlogChip />
        </div>
      </div>
      <div className="my-4 flex h-12 items-center justify-between border-y border-gray-200 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src={profile} width={24} height={24} alt="profile" />
            <div className="text-xs font-medium text-gray-800">닉네임</div>
          </div>
          <div className="itmes-center flex gap-1 text-sm font-medium text-gray-500">
            <button>
              <Image
                src={inactiveHeart}
                width={16}
                height={16}
                alt="inactive_heart"
              />
            </button>
            likes
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500">work.createAt</div>
      </div>
      <div className="mb-6 border-b border-gray-200 pb-10">work.content</div>

      <FeedbackBox />
    </Container>
  );
}
