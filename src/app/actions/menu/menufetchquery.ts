// menu-query.ts
import fetchMenudata from "@/app/actions/menu/menu-fetch";
import { IMenudata } from "@/app/type/type";

export const PAGE_SIZE = 5;

export const fetchMenudataQuery = (search?: string, status?: string) => ({
  queryKey: ["menu", search, status],
  queryFn: ({ pageParam = 0 }) => fetchMenudata(pageParam, search , status),
  getNextPageParam: (lastPage: IMenudata[], allPages: IMenudata[][]) => {
    if (lastPage.length < PAGE_SIZE) return undefined;

    return allPages.length;
  },
  initialPageParam: 0,
});
