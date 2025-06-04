"use client";
import React, { useState } from "react";
import inactiveDown from "@/assets/btn/btn_down_inactive.svg";
import activeDown from "@/assets/btn/btn_down.svg";
import Image from "next/image";
import Reply from "@/components/reply/Reply";
import TextBox from "@/components/reply/TextBox";
import { useParams } from "next/navigation";
import { fetchFeedbacks, addFeedback, updateFeedback, deleteFeedback } from "@/lib/api/feedback";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState("");
  const params = useParams();
  const workId = params.workId;
  const queryClient = useQueryClient();

  // 피드백 목록 조회
  const {
    data: feedbacks = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ["feedbacks", workId],
    queryFn: ({ pageParam = 1 }) => fetchFeedbacks(workId, pageParam, 5),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.feedbacks)
  });

  // 피드백 등록
  const { mutate: mutateAddFeedback, isPending: isAdding } = useMutation({
    mutationFn: (content) => addFeedback(workId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks", workId] });
      setFeedback("");
    },
    onError: (error) => {
      console.error("피드백 등록 실패:", error.message);
      alert(error.message || "피드백 등록에 실패했습니다.");
    }
  });

  // 피드백 수정
  const { mutate: mutateUpdateFeedback } = useMutation({
    mutationFn: ({ feedbackId, content }) => updateFeedback(workId, feedbackId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks", workId] });
    },
    onError: (error) => {
      console.error("피드백 수정 실패:", error.message);
      alert(error.message || "피드백 수정에 실패했습니다.");
    }
  });

  // 피드백 삭제
  const { mutate: mutateDeleteFeedback } = useMutation({
    mutationFn: (feedbackId) => deleteFeedback(workId, feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks", workId] });
    },
    onError: (error) => {
      console.error("피드백 삭제 실패:", error.message);
      alert(error.message || "피드백 삭제에 실패했습니다.");
    }
  });

  // 피드백 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    mutateAddFeedback(feedback);
  };

  // 피드백 수정
  const onEdit = (feedbackId, editedContent) => {
    mutateUpdateFeedback({ feedbackId, content: editedContent });
  };

  // 피드백 삭제
  const onDelete = (feedbackId) => {
    mutateDeleteFeedback(feedbackId);
  };

  // 로딩 UI
  if (status === "pending" && !feedbacks.length) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 에러 UI
  if (status === "error") {
    return <div className="p-4 text-center text-red-500">에러 발생: {error.message}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-[17px]">
        <TextBox value={feedback} onChange={(e) => setFeedback(e.target.value)} onSubmit={handleSubmit} />
        <button type="submit" className="self-start" disabled={!feedback.trim() || isAdding}>
          <Image
            src={feedback ? activeDown : inactiveDown}
            width={32}
            height={32}
            alt={feedback ? "active_down" : "inactive_down"}
          />
        </button>
      </form>

      {/* 피드백 목록 */}
      {feedbacks.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-400">피드백이 없습니다.</div>
      ) : (
        <>
          {feedbacks.map((item) => (
            <Reply
              key={item.id}
              userName={item.user?.nickname || "익명"}
              timestamp={item.createdAt}
              content={item.content}
              isAuthor={item.isAuthor}
              onEdit={(editedContent) => onEdit(item.id, editedContent)}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </>
      )}

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className="my-2 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-45 rounded-xl bg-gray-100 py-2 text-center hover:bg-gray-50"
          >
            {isFetchingNextPage ? "로딩 중..." : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
