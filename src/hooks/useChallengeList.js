import { getChallenges } from "@/lib/api/challenge-api/searchChallenge";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";

const useChallenges = (myChallengeStatus) => {
  const [filters, setFilters] = useState({
    categories: [],
    docType: "",
    status: ""
  });
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const getInitialPageSize = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 375 ? 5 : 4;
    }
    return 4;
  };

  const [pageSize, setPageSize] = useState(getInitialPageSize);
  const [filterCount, setFilterCount] = useState(0);

  // 디바운스를 위한 ref
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current); //이전 타이머 취소

      resizeTimeout.current = setTimeout(() => {
        const newPageSize = getInitialPageSize();
        setPageSize((prevPageSize) => {
          if (prevPageSize !== newPageSize) {
            return newPageSize;
          }
          return prevPageSize;
        });
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    // 언마운트 시 정리
    return () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current); //컴포넌트가 사라지면 이벤트도 같이 사라져야함
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters, keyword]);

  //쿼리로 보낼 options 구성
  const queryOptions = useMemo(
    () => ({
      page,
      pageSize,
      keyword,
      category: filters.categories,
      docType: filters.docType,
      status: filters.status
    }),
    [page, pageSize, keyword, filters]
  );

  const {
    data: challengesResults,
    isLoading,
    error
  } = useQuery({
    queryKey: ["challenges", queryOptions, myChallengeStatus],
    queryFn: () => getChallenges(queryOptions, myChallengeStatus),
    keepPreviousData: true, //데이터 변경 시 이전 데이터를 유지해줌으로써 UX 최적화
    staleTime: 1000 * 60 // 1분. 이 시간 동안은 재요청 없이 캐시된 데이터 사용
  });

  const challenges = useMemo(() => {
    if (!challengesResults?.data) return [];

    const currentDate = new Date();

    //필터에서 마감/진행중 선택 시
    if (filters.status === "progress") {
      return challengesResults.data.filter((result) => {
        const deadlineDate = new Date(result.deadline);
        return deadlineDate.getTime() > currentDate.getTime();
      });
    }
    if (filters.status === "closed") {
      return challengesResults.data.filter((result) => {
        const deadlineDate = new Date(result.deadline);
        return deadlineDate.getTime() < currentDate.getTime();
      });
    }

    return challengesResults.data;
  }, [challengesResults, filters.status]);

  const applyFilters = ({ fields, docType, status }) => {
    setFilters({
      categories: fields,
      docType,
      status
    });

    const currentFilterCount = fields.length + Number(!!docType) + Number(!!status);

    setFilterCount(currentFilterCount);
  };

  return {
    challenges,
    totalCount: challengesResults?.totalCount || 0,
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
