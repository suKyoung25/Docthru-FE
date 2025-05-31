import React from "react";

function LineDivider({ className = "text-gray-200 my-4" }) {
  return <span className={`flex border-b-1 ${className}`}></span>;
}

export default LineDivider;
