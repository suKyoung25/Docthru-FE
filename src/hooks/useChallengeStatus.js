import { useEffect, useState } from "react";
import dayjs from "dayjs";

/**
 * @param {Object} challenge - 챌린지 데이터
 * @returns {"expired" | "closed" | "open" | null}
 */
export function useChallengeStatus(challenge) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!challenge) return;

    const now = dayjs();
    const deadline = dayjs(challenge.deadline);
    const participants = challenge.participants?.length || 0;
    const maxParticipant = challenge.maxParticipant || 0;

    if (now > deadline) {
      setStatus("expired");
    } else if (participants >= maxParticipant) {
      setStatus("closed");
    } else {
      setStatus("");
    }
  }, [challenge]);

  return status;
}
