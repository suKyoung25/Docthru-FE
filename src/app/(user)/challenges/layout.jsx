"use client";

import Gnb from "@/layout/Gnb";
import { usePathname } from "next/navigation";
import React from "react";

export default function ChallengesLayout({ children }) {
  const pathname = usePathname();

  const isCreateWork = pathname.includes("/create");

  return (
    <div>
      {!isCreateWork && <Gnb userRole="member" />}
      {children}
    </div>
  );
}
