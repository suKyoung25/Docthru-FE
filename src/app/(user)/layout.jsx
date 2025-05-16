import Gnb from "@/layout/_components/Gnb";
import React from "react";

export default function UserLayout({ children }) {
  return (
    <div>
      <Gnb userRole="member" />
      {children}
    </div>
  );
}
