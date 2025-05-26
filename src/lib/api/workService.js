import { tokenFetch } from '../fetchClient';

const workService = {
  // 챌린지 작업물 목록 조회 (페이지네이션)
  getWorkList: async (challengeId, page = 1, size = 5) => {
    const response = await tokenFetch(`/challenges/${challengeId}/works?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
  },

  // 작업물 상세 조회
  getWorkDetail: async (challengeId, workId) => {
    const response = await tokenFetch(`/challenges/${challengeId}/works/${workId}`);
    const data = await response.json();
    return data;
  },

  // 작업물 생성
  createWork: async (challengeId) => {
    const response = await tokenFetch(`/challenges/${challengeId}/works`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
  },

  // 작업물 제출 및 수정
  updateWork: async (workId, content) => {
    const response = await tokenFetch(`/works/${workId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content })
    });
    const data = await response.json();
    return data;
  },

  // 작업물 삭제(포기)
  deleteWork: async (workId) => {
    const response = await tokenFetch(`/works/${workId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  },

  // 작업물 좋아요 생성
  createWorkLike: async (workId) => {
    const response = await tokenFetch(`/works/${workId}/like`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
  },

  // 작업물 좋아요 삭제
  deleteWorkLike: async (workId) => {
    const response = await tokenFetch(`/works/${workId}/like`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
};

export default workService;
