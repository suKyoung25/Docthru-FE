import React from "react";
import iconBtnRight from "@/assets/btn/btn_right.svg";
import iconBtnDown from "@/assets/btn/btn_down.svg";
import iconBtnDownInactive from "@/assets/btn/btn_down_inactive.svg";
import Image from "next/image";

export default function IconBtnRight() {
  return (
    <div>
      <Image src={iconBtnRight} alt="오른쪽" className="w-6 h-6 sm:w-10 sm:h-10"/>
    </div>
  )
}


export function IconBtnDown({inactive}) {
  return (
    <div>
      { inactive ?
        <Image src={iconBtnDownInactive} alt="아래로" /> : <Image src={iconBtnDown} alt="아래로" />
      }
    </div>
  )
}
