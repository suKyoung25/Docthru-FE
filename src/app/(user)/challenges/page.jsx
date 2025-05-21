"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import { useEffect, useState } from "react";
import { getChallenges } from "@/lib/api/searchChallenges";

function page() {
  const [challenges, setChallenges] = useState(null);
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [participants, setParticipants] = useState(0);
  const [keyword, setKeyword] = useState("");

  //챌린지 목록 불러오기
  const getChallengesData = async () => {
    try {
      const options = {
        page: 1,
        pageSize: 4,
        category,
        docType,
        keyword,
      };

      //디버깅
      console.log("options", options);

      const result = await getChallenges(options);
      setChallenges(result);

      //디버깅
      console.log("result", result);
      console.log("challenges", challenges);
    } catch (error) {
      console.error("챌린지 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    getChallengesData();
  }, []);

  return (
    <>
      <div className="mx-[16px] mt-[16px] mb-[65px]">
        <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
          챌린지 목록 <ApplyChallenge />
        </div>

        <div className="mt-[16px] flex flex-row gap-[8px]">
          <div className="flex-[1]">
            <Sort />
          </div>
          <div className="flex-[2.5]">
            <SearchInput
              text={"text-[14px]"}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* <ChallengeCard status={} title={} type={} category={} deadline={} participants={}/> */}
      </div>
    </>
  );
}

export default page;
