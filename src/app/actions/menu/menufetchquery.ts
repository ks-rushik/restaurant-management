// menu-query.ts
import fetchMenudata from "@/app/actions/menu/menu-fetch";

export const PAGE_SIZE = 2;

export const fetchMenudataQuery = (search?: string, status?: string) => ({
  queryKey: ["menu", search, status],
  queryFn: ({ pageParam = 0 }) => fetchMenudata(search, status, pageParam),
  getNextPageParam: (lastPage, allPages) => {
    if (lastPage.length < allPages.length) return undefined;

    return allPages.length;
  },
  initialPageParam: 0,
});
