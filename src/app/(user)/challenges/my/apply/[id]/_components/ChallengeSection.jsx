import ChallengeContent from "@/app/(user)/challenges/[challengeId]/_components/ChallengeContent";
import ChallengeInfo from "@/app/(user)/challenges/[challengeId]/_components/ChallengeInfo";
import React from "react";

function ChallengeSection({ challenge }) {
  const { title, description, category, docType, deadline, participants, maxParticipant } = challenge || {};

  return (
    <section className="space-y-4">
      <ChallengeContent title={title} description={description} category={category} docType={docType} />
      <ChallengeInfo deadline={deadline} participants={participants} maxParticipant={maxParticipant} />
    </section>
  );
}

export default ChallengeSection;
