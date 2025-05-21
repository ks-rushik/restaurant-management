import { ICategorydata } from "@/app/components/category/AddCategoryModal";

import fetchCategorydata from "./category-fetch";
import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";

export const fetchCategorydataQuery = (
  menuId: string,
  search?: string,
  status?: string,
) => ({
  queryKey: ["category", menuId, search, status],
  queryFn: ({ pageParam = 0 }) =>
    fetchCategorydata(pageParam, menuId, search, status),
  getNextPageParam: (
    lastpage: ICategorydata[],
    allPages: ICategorydata[][],
  ) => {
    if (lastpage.length < PAGE_SIZE) return undefined;
    return allPages.length;
  },
  initialPageParam: 0,
});
