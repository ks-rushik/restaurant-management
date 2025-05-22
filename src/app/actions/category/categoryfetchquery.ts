import { ICategorydata } from "@/app/components/category/AddCategoryModal";

import fetchCategorydata from "./category-fetch";

export type IPage = { data: ICategorydata[]; count: number | null };

export const fetchCategorydataQuery = (
  menuId: string,
  search?: string,
  status?: string,
) => ({
  queryKey: ["category", menuId, search, status],
  queryFn: ({ pageParam = 0 }) =>
    fetchCategorydata(pageParam, menuId, search, status),
  getNextPageParam: (lastPage: IPage, allPages: IPage[]) => {
    const totalFetched = allPages.reduce(
      (sum, page) => sum + page.data.length,
      0,
    );
    const totalAvailable = lastPage.count ?? 0;

    return totalFetched < totalAvailable ? allPages.length : undefined;
  },
  initialPageParam: 0,
});
