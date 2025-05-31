import { getMyChallengesAction } from "@/lib/actions/user";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMyChallenges({ category, docType, keyword, status }) {
  const queryResult = useInfiniteQuery({
    queryKey: ["myChallenges", category, docType, keyword, status],
    queryFn: async ({ pageParam = null }) => {
      const res = await getMyChallengesAction({
        params: {
          pageSize: 3,
          cursor: pageParam,
          ...(category && { category }),
          ...(docType && { docType }),
          ...(keyword && { keyword }),
          ...(status && { status })
        }
      });

      return res;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,
    select: (data) => ({
      ...data,
      challenges: data.pages.flatMap((page) => page.challenges)
    })
  });

  return {
    challenges: queryResult.data?.challenges ?? [],
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    fetchNextPage: queryResult.fetchNextPage
  };
}
