import React from "react";

<<<<<<< HEAD
export default function CategoryItems({ toggleType, onSelect }) {
  let categories;

  toggleType === "fields"
    ? (categories = ["Next.js", "API", "Career", "Modern JS", "Web"])
    : (categories = ["공식문서", "블로그"]);

  return (
    <div className="flex flex-col rounded-lg border border-[#E5E5E5]">
      {categories.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;

        return (
          <div
            key={item}
            onClick={() => onSelect(item)}
            className={`flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] p-4 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`}
          >
            <span className="text-[16px] text-[#A3A3A3]">{item}</span>
          </div>
        );
      })}
=======
export default function CategoryItems() {
  return (
    <div className="flex h-14 flex-col items-center justify-between rounded-lg border border-[#E5E5E5] bg-white">
      <div className="flex h-14 w-full flex-col items-center justify-between rounded-t-lg border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Next.js</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">API</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Career</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Modern JS</span>
      </div>
      <div className="flex h-14 w-full flex-col items-center justify-between rounded-b-lg border border-[#E5E5E5] bg-white p-4">
        <span className="text-[16px] text-[#A3A3A3]">Web</span>
      </div>
>>>>>>> dev
    </div>
  );
}
