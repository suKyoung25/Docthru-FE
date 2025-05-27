'use client';
import React, { useEffect, useState } from 'react';
import inactiveDown from '@/assets/btn/btn_down_inactive.svg';
import activeDown from '@/assets/btn/btn_down.svg';
import Image from 'next/image';
import Reply from '@/components/reply/Reply';
import TextBox from '@/components/reply/TextBox';
import { useParams } from 'next/navigation';

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const params = useParams();
  const workId = params.workId;

  // 피드백 목록 불러오기
  const fetchFeedbackList = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/feedbacks`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('데이터 불러오기 실패');
      const data = await res.json();
      setFeedbacks(data || []);
    } catch (error) {
      console.error('피드백 불러오기 실패:', error);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    if (workId) fetchFeedbackList();
  }, [workId]);

  // 피드백 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/feedbacks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: feedback })
      });
      if (res.ok) {
        fetchFeedbackList();
        setFeedback('');
      }
    } catch (error) {
      console.error('피드백 등록 실패:', error);
    }
  };

  // 피드백 수정
  const onEdit = async (feedbackId, editedContent) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/feedbacks/${feedbackId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent })
      });
      if (res.ok) fetchFeedbackList();
    } catch (error) {
      console.error('Error editing feedback:', error);
    }
  };

  // 피드백 삭제
  const onDelete = async (feedbackId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) fetchFeedbackList();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-[17px]">
        <TextBox value={feedback} onChange={(e) => setFeedback(e.target.value)} onSubmit={handleSubmit} />
        <button type="submit" className="self-start" disabled={!feedback.trim()}>
          <Image
            src={feedback ? activeDown : inactiveDown}
            width={32}
            height={32}
            alt={feedback ? 'active_down' : 'inactive_down'}
          />
        </button>
      </form>
      {feedbacks.map((feedbackItem) => (
        <Reply
          key={feedbackItem.id}
          userName={feedbackItem.user?.nickname || '익명'}
          timestamp={feedbackItem.createdAt}
          content={feedbackItem.content}
          isAuthor={feedbackItem.isAuthor}
          onEdit={(editedContent) => onEdit(feedbackItem.id, editedContent)}
          onDelete={() => onDelete(feedbackItem.id)}
        />
      ))}
    </div>
  );
}
