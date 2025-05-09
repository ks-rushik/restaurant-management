import fetchMenudata from "./menu-fetch";

export const fetchMenudataQuery = (search?: string, status?: string) => ({
  queryKey: ["menu", search, status],
  queryFn: () => fetchMenudata(search, status),
});
