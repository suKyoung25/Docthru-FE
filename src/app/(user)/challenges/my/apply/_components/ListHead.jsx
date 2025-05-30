import { columnSetting } from "@/constant/constant";
import React from "react";

export default function ListHead() {
  // 각 column의 flex 값을 기반으로 grid column 비율 생성
  const gridTemplate = columnSetting.map(col => `${col.flex ?? 1}fr`).join(" ");
  return (
    <div 
      className="mb-2 flex h-9 w-full min-w-[670px]"
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {columnSetting.map(({ label, flex }, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === columnSetting.length - 1;
        return (
          <div
            key={idx}
            className={`flex items-center bg-gray-800 px-1 text-left text-sm text-white ${isFirst ? "rounded-tl-lg rounded-bl-lg pl-4" : ""} ${isLast ? "rounded-tr-lg rounded-br-lg" : ""} `}
            style={{ flex }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
