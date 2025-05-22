"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import { useEffect, useState } from "react";
import { getChallenges } from "@/lib/api/searchChallenges";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";

function page() {
  const [filters, setFilters] = useState({
    category: "",
    docType: "",
    status: "",
  });
  const [challenges, setChallenges] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isModal, setIsModal] = useState(false);

  //챌린지 목록 불러오기
  const getChallengesData = async () => {
    try {
      const options = {
        page: 1,
        pageSize: 4,
        keyword,
        ...filters,
      };

      //category, docType, keyword 만 걸러진 challenges 데이터
      const results = await getChallenges(options);

      const currentDate = new Date();

      //status(진행 중/마감) 도 걸러진 challengs 데이터
      if (filters.status === "progress") {
        const filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);

          return deadlineDate.getTime() > currentDate.getTime();
        });

        setChallenges(filteredResults);
      } else if (filters.status === "closed") {
        const filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);

          return deadlineDate.getTime() < currentDate.getTime();
        });

        setChallenges(filteredResults);
      } else {
        setChallenges(results);
      }
    } catch (error) {
      console.error("챌린지 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    getChallengesData();
  }, [filters, keyword]);

  //디버깅
  console.log("challenges", challenges);

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleApplyFilters = ({ fields, docType, status }) => {
    //category를 fields 중복 허용?
    setFilters({
      category: fields[0] || "",
      docType: docType || "",
      status: status || "",
    });

    //디버깅
    console.log("status", status);

    // 모달 닫기
    setIsModal(false);
  };

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort onClick={handleClickFilter} />
          {isModal ? (
            <FilterModal
              onApply={handleApplyFilters}
              onClose={() => setIsModal(false)}
            />
          ) : null}
        </div>
        <div className="flex-[2.5]">
          <SearchInput
            text={"text-[14px]"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[24px] py-[24px]">
        {challenges ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
            />
          ))
        ) : (
          <div>챌린지가 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
}

export default page;
