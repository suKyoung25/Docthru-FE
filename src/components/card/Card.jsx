import Image from "next/image";
import dropdownIcon from "@/assets/icon/ic_menu.svg";
import clockIcon from "@/assets/icon/ic_clock.svg";
import usersIcon from "@/assets/icon/ic_person.svg";
import { typeChipMap, categoryChipMap } from "../chip/chipMaps";
import ChipCardStatus from "@/components/chip/chipComplete/ChipCardStatus";

export default function ChallengeCard({
  title,
  type,
  category,
  deadline,
  participants,
  status,
  variant = "full",
}) {
  const isSimple = variant === "simple";
  const hasStatus = !isSimple && status;

  return (
    <div
      className={`flex w-full flex-col ${isSimple ? "" : "rounded-xl bg-white shadow-md"}`}
    >
      {/* 상단: 좌측에는 상태칩 또는 제목, 우측에는 드롭다운 */}
      <div className="flex items-center justify-between">
        {hasStatus ? (
          <ChipCardStatus status={status} />
        ) : (
          <div className="text-xl font-semibold text-gray-800">{title}</div>
        )}
        <button>
          <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
        </button>
      </div>

      {hasStatus && (
        <div className="mt-2 text-xl font-semibold text-gray-800">{title}</div>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {typeChipMap[type] ?? null}
        {categoryChipMap[category] ?? null}
      </div>

      {!isSimple && (
        <>
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
        </>
      )}
    </div>
  );
}
