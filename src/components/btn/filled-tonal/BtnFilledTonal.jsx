import React from "react";

// 사용법
// <BtnFilledTonal>버튼명</BtnFilledTonal>

// props

// const BtnFilledTonalStyle = {
//   reject: {
//     backgroundColor: "#FFE7E7",
//     color: "#fe4744",
//   },
//   withdraw: {
//     background,
//   },
// };
export default function BtnFilledTonal({ children, style }) {
  return (
    <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#FFE7E7] font-semibold text-[#fe4744]">
      {children}
    </div>
  );
}
