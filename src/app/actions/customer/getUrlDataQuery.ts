import getUrlData from "./getUrlData";

export const getUrlDataQuery = (Id: string) => ({
  queryKey: ["url"],
  queryFn: () => getUrlData(Id),
  staleTime: 1000 * 60,
});
