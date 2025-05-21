import Gnb from "@/layout/Gnb";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Gnb userRole="admin" />
      {children}
    </div>
  );
}
