import ChallengeContent from "@/app/(user)/challenges/[challengeId]/_components/ChallengeContent";
import ChallengeInfo from "@/app/(user)/challenges/[challengeId]/_components/ChallengeInfo";
import React from "react";

function ChallengeSection({ challenge, adminStatus }) {
  const { title, description, category, docType, deadline, participants, maxParticipant, id } = challenge || {};

  return (
    <section className="space-y-4">
      <ChallengeContent
        challengeId={id}
        title={title}
        description={description}
        category={category}
        docType={docType}
        adminStatus={adminStatus}
      />
      <ChallengeInfo
        deadline={deadline}
        participants={participants || ""}
        maxParticipant={maxParticipant || ""}
        adminStatus={adminStatus}
      />
    </section>
  );
}

export default ChallengeSection;
