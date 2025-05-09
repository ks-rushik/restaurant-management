import fetchItemdata from "./item-fetch";

export const fetchItemdataQuery = (
  categoryId: string,
  search?: string,
  status?: string,
) => ({
  queryKey: ["Items", categoryId, search, status],
  queryFn: () => fetchItemdata(categoryId, search, status),
});
