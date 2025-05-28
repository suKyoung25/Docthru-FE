"use client";

import StatusSection from "@/app/(user)/challenges/my/apply/[id]/_components/StatusSection";
import ChallengeSection from "@/app/(user)/challenges/my/apply/[id]/_components/ChallengeSection";
import LineDivider from "@/app/(user)/challenges/my/apply/[id]/_components/LineDivider";
import React, { useEffect, useState } from "react";
import OriginalUrlSection from "@/app/(user)/challenges/my/apply/[id]/_components/OriginalUrlSection";
import { useParams } from "next/navigation";
import { userService } from "@/lib/service/userService";
import BtnText from "@/components/btn/text/BtnText";
import DeclineModal from "@/components/modal/DeclineModal";
import { acceptChallengeAction, declineChallengeAction } from "@/lib/actions/challenge";
import Image from "next/image";
import arrorLeft from "@/assets/icon/ic_arrow_left.svg";
import arrorRight from "@/assets/icon/ic_arrow_right.svg";

export default function AdminApplicationPage() {
  const params = useParams();
  const applicationId = params.id;
  const [application, setApplication] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);

  const fetchApplication = async () => {
    try {
      const data = await userService.getApplication(applicationId);
      setApplication(data.application);
      setChallenge(data.challenge);
    } catch (error) {
      console.log("신청한 챌린지 상세 불러오기 실패: ", error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleConfirmDecline = async (reason) => {
    if (!challenge.id) {
      console.error("challengeId가 없습니다.");
      return;
    }
    try {
      await declineChallengeAction(challenge.id, reason);
      console.log("챌린지 거절 성공:", challenge.id, reason);
      setisModalOpen(false);
      alert("챌린지가 성공적으로 거절되었습니다.");
      await fetchApplication();
    } catch (error) {
      console.error("챌린지 거절 실패:", error.message);
      alert(`챌린지 거절 실패: ${error.message}`);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptChallengeAction(challenge.id);
      console.log("승인된 챌린지:", challenge.id);
      await fetchApplication();
    } catch (error) {
      console.error("챌린지 승인 실패", error);
    }
  };

  return (
    <div className="mt-4 pb-[10rem] md:mt-6">
      <div className="flex justify-between">
        <span className="font-medium text-gray-800">No. {applicationId}</span>
        <button className="flex gap-[10px]">
          <Image src={arrorLeft} alt="이전 챌린지" width={24} height={24} />
          <Image src={arrorRight} alt="다음 챌린지" width={24} height={24} />
        </button>
      </div>
      <StatusSection application={application} />
      <LineDivider />
      <ChallengeSection challenge={challenge} />
      <LineDivider />
      <OriginalUrlSection originalPageUrl={challenge?.originalUrl} />
      {(application?.adminStatus === "PENDING" || application?.adminStatus === "ACCEPTED") && <LineDivider />}
      {application?.adminStatus === "PENDING" && (
        <div className="flex gap-3 md:justify-end">
          <BtnText
            theme="tonal"
            children="거절하기"
            className="w-[166px] md:w-[158px]"
            onClick={() => setisModalOpen(true)}
          />
          <BtnText theme="solidblack" children="승인하기" className="w-[166px] md:w-[158px]" onClick={handleAccept} />
        </div>
      )}
      {isModalOpen && <DeclineModal onClose={() => setisModalOpen(false)} onConfirm={handleConfirmDecline} />}
    </div>
  );
}
