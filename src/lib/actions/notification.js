"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 공통 헤더 생성 함수
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${token}`
  };
};

/**
 * 읽지 않은 알림 목록 조회
 */
export async function getUnreadNotificationsAction() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/notifications/unread`, {
    method: "GET",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`읽지 않은 알림 조회 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

/**
 * 모든 알림 목록 조회
 */
export async function getNotificationsAction() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "GET",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`알림 목록 조회 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

/**
 * 알림 읽음 처리
 */
export async function updateIsReadAction(notificationId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/notifications/${notificationId}`, {
    method: "PATCH",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`알림 읽음 처리 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}
