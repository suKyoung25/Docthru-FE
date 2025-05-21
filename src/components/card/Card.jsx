import Image from "next/image";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import clockIcon from "@/assets/icon/ic_clock.svg";
import usersIcon from "@/assets/icon/ic_person.svg";
import { typeChipMap, categoryChipMap } from "../chip/chipMaps";
import ChipCardStatus from "@/components/chip/chipComplete/ChipCardStatus"; // 좌상단 chip

export default function ChallengeCard({
  status,
  title,
  type,
  category,
  deadline,
  participants,
}) {
  return (
    <div className="flex h-[227px] w-full max-w-[996px] flex-col justify-between rounded-[12px] bg-white p-4 shadow-md sm:h-[262px] sm:max-w-[343px] md:h-[225px] md:max-w-[696px]">
      <div className="flex items-start justify-between">
        <ChipCardStatus status={status} />
        <button>
          <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
        </button>
      </div>

      <div className="mt-2 text-[22px] font-semibold text-[var(-gray-400)]">
        {title}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {typeChipMap[type]}
        {categoryChipMap[category]}
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Image src={clockIcon} alt="시계" width={16} height={16} />
            <span>{deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={usersIcon} alt="사람" width={16} height={16} />
            <span>{participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
