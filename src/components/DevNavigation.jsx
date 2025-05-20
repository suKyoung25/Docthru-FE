"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 개발용 네비게이션 컴포넌트
 *
 * Next.js 13+ App Router 구조에 맞춰 경로를 관리합니다.
 * - @(user): 사용자 관련 라우트 (/challenges/*)
 * - @(admin): 관리자 관련 라우트
 * - 기타: 공통 컴포넌트 등
 */
export default function DevNavigation() {
  const pathname = usePathname();

  const routes = [
    // 공통 라우트
    { path: "/", name: "랜딩 페이지", group: "common" },
    { path: "/example", name: "공통컴포넌트 예시", group: "common" },

    // 사용자 관련 라우트 (@user)
    { path: "/challenges", name: "챌린지 목록", group: "user" },
    { path: "/challenges/create", name: "챌린지 생성", group: "user" },
    { path: "/challenges/[challengeId]", name: "챌린지 상세", group: "user" },
    {
      path: "/challenges/[challengeId]/create",
      name: "작업물 생성",
      group: "user",
    },
    {
      path: "/challenges/[challengeId]/work/[workId]",
      name: "작업물 상세",
      group: "user",
    },
    {
      path: "/challenges/[challengeId]/work/[workId]/edit",
      name: "작업물 수정",
      group: "user",
    },

    // 관리자 관련 라우트 (@admin)
    { path: "/admin/management", name: "챌린지 관리", group: "admin" },
    { path: "/admin/challenges", name: "챌린지 목록", group: "admin" },
  ];

  // 라우트를 그룹별로 분류
  const groupedRoutes = routes.reduce((acc, route) => {
    if (!acc[route.group]) {
      acc[route.group] = [];
    }
    acc[route.group].push(route);
    return acc;
  }, {});

  // 동적 라우트 경로 변환 함수
  const getHref = (path) =>
    path.replace("[challengeId]", "1").replace("[workId]", "99"); // 임의의 mock ID

  return (
    <nav className="bg-brand-black fixed bottom-0 left-0 z-50 w-full p-2 text-white">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {Object.entries(groupedRoutes).map(([group, routes]) => (
          <div key={group} className="flex items-center gap-2">
            <span className="text-brand-yellow font-semibold">
              {group === "user"
                ? "사용자:"
                : group === "admin"
                  ? "관리자:"
                  : "공통:"}
            </span>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={getHref(route.path)}
                className={`rounded px-3 py-1 text-sm ${
                  pathname === getHref(route.path)
                    ? "bg-brand-yellow text-brand-black font-medium"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
