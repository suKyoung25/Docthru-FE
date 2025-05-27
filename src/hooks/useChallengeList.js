import { getChallenges } from "@/lib/api/challenges-first/searchChallenge";
import { useState, useEffect, useCallback } from "react";

const useChallenges = () => {
  const [filters, setFilters] = useState({
    categories: [],
    docType: "",
    status: ""
  });
  const [challenges, setChallenges] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filterCount, setFilterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChallengesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const options = {
        page,
        pageSize,
        keyword,
        category: filters.categories[0] || "",
        docType: filters.docType,
        status: filters.status
      };

      const challengesResults = await getChallenges(options);
      setTotalCount(challengesResults.totalCount);
      const results = challengesResults.data;

      const currentDate = new Date();

      let filteredResults = results;
      if (filters.status === "progress") {
        filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);
          return deadlineDate.getTime() > currentDate.getTime();
        });
      } else if (filters.status === "closed") {
        filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);
          return deadlineDate.getTime() < currentDate.getTime();
        });
      }
      setChallenges(filteredResults);
    } catch (err) {
      console.error("챌린지 목록 불러오기 실패:", err);
      setError("챌린지 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, keyword, filters]);

  const deleteChallenge = async (challengeId, adminMessage) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/challenges/${challengeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          adminStatus: "DELETED",
          adminMessage: adminMessage
        })
      });

      if (!response.ok) {
        throw new Error("챌린지 삭제에 실패했습니다.");
      }

      const data = await response.json();
      console.log("챌린지 삭제 성공:", data);
      setChallenges((prevChallenges) => prevChallenges.filter((challenge) => challenge.id !== challengeId));
      setTotalCount((prevCount) => prevCount - 1);
      return data;
    } catch (err) {
      console.error("챌린지 삭제 오류:", err);
      throw err;
    }
  };

  useEffect(() => {
    getChallengesData();
  }, [getChallengesData]);

  useEffect(() => {
    setPage(1);
  }, [filters, keyword]);

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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const applyFilters = useCallback(({ fields, docType, status }) => {
    setFilters({
      categories: fields,
      docType,
      status
    });

    const currentFilterCount = [fields.length > 0 ? 1 : 0, docType ? 1 : 0, status ? 1 : 0].filter(Boolean).length;

    setFilterCount(currentFilterCount);
  }, []);

  return {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters
  };
};

export default useChallenges;
