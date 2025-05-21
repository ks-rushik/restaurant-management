// menu-query.ts
import fetchMenudata from "@/app/actions/menu/menu-fetch";
import { IMenudata } from "@/app/type/type";

export const PAGE_SIZE = 5;

export type IPage = { data: IMenudata[]; count: number };

export const fetchMenudataQuery = (search?: string, status?: string) => ({
  queryKey: ["menu", search, status],
  queryFn: ({ pageParam = 0 }) => fetchMenudata(pageParam, search, status),
  getNextPageParam: (lastPage: IPage, allPages: IPage[]) => {
    const totalFetched = allPages.reduce((sum, page) => sum + page.data.length, 0);
  const totalAvailable = lastPage.count ?? 0;

  return totalFetched < totalAvailable ? allPages.length : undefined;
  },
  initialPageParam: 0,
});

// const totalFetched = allPages.flatMap((page) => page.data).length;
//     const totalAvailable = lastPage.count ?? 0;

//     return totalFetched < totalAvailable ? allPages.length : undefined;
