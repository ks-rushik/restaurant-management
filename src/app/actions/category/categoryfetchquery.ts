import fetchCategorydata from "./category-fetch";

export const fetchCategorydataQuery = (
  menuId: string,
  search?: string,
  status?: string,
) => ({
  queryKey: ["category", menuId, search, status],
  queryFn: () => fetchCategorydata(menuId, search, status),
});
