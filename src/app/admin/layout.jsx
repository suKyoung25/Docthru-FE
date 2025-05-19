import Gnb from "@/layout/_components/Gnb";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Gnb userRole="admin" />
      {children}
    </div>
  );
}
