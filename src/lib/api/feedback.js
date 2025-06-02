import {
  createFeedbackAction,
  deleteFeedbackAction,
  getFeedbacksAction,
  updateFeedbackAction
} from "../actions/feedback";

export async function fetchFeedbacks(workId, page = 1, size = 5) {
  const data = await getFeedbacksAction(workId);
  const start = (page - 1) * size;
  const end = page * size;
  return {
    feedbacks: data.slice(start, end),
    hasMore: end < data.length,
    nextPage: end < data.length ? page + 1 : undefined
  };
}

export async function addFeedback(workId, content) {
  return await createFeedbackAction(workId, content);
}

export async function updateFeedback(workId, feedbackId, content) {
  return await updateFeedbackAction(workId, feedbackId, content);
}

export async function deleteFeedback(workId, feedbackId) {
  return await deleteFeedbackAction(workId, feedbackId);
}
