"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import { useEffect, useState } from "react";
import { getChallenges } from "@/lib/api/searchChallenges";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";

function page() {
  const [filters, setFilters] = useState({
    categories: [],
    docType: "",
    status: "",
  });
  const [challenges, setChallenges] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filterCount, setFilterCount] = useState(0); //필터가 몇개 선택되었는지 count

  //챌린지 목록 불러오기
  const getChallengesData = async () => {
    try {
      const options = {
        page,
        pageSize,
        keyword,
        category: filters.categories[0] || "",
        docType: filters.docType,
        status: filters.status,
      };

      //category, docType, keyword 만 걸러진 challenges 데이터
      const challengesResults = await getChallenges(options);
      setTotalCount(challengesResults.totalCount);
      const results = challengesResults.data;

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
  }, [page]);

  useEffect(() => {
    setPage(1);
    getChallengesData();
  }, [filters, keyword]);

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleApplyFilters = ({ fields, docType, status }) => {
    //category를 fields 중복 허용?
    setFilters({
      categories: fields,
      docType,
      status,
    });

    setFilterCount(
      [fields.length > 0 ? 1 : 0, docType, status].filter(
        (value) => value && value !== "",
      ).length,
    );

    setIsModal(false);
  };

  //반응형 (불러오는 챌린지 갯수)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 375) {
        setPageSize(5);
      } else {
        setPageSize(4);
      }
    };

    handleResize();

    // 창 크기 변경 감지
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort
            onClick={handleClickFilter}
            isFiltered={filterCount > 0}
            count={filterCount}
          />
          {isModal ? (
            <FilterModal
              onApply={handleApplyFilters}
              onClose={() => setIsModal(false)}
              initialFields={filters.categories}
              initialDocType={filters.docType}
              initialStatus={filters.status}
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

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default page;
