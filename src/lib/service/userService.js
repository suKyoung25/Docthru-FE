import {
  deleteChallengeAction,
  getApplicationAction,
  getMyApplicationsAction,
  getMyChallengesAction,
  getUserAction
} from "../actions/user";

export const userService = {
  // 사용자 정보 조회
  getMe: async () => {
    return await getUserAction();
  },

  // 나의 챌린지 목록 조회 (참여중, 완료한)
  getMyChallenges: async (pageSize, cursor, category, docType, keyword, status) => {
    return await getMyChallengesAction({ params: { pageSize, cursor, category, docType, keyword, status } });
  },

  // 니의 챌린지 신청 목록 조회
  getMyApplications: async (page, pageSize, sort, keyword) => {
    return await getMyApplicationsAction({ params: { page, pageSize, sort, keyword } });
  },

  // 나의 챌린지 신청 상세 조회
  getApplication: async (applicationId) => {
    return await getApplicationAction(applicationId);
  },

  // 챌린지 신청 취소 (삭제)
  deleteChallenge: async (challengeId) => {
    return await deleteChallengeAction(challengeId);
  }
};
