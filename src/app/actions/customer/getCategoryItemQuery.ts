import fetchCategoryItemData from "./getCategoryItem";

export const getCategoryItemQuery = (Id: string) => ({
  queryKey: ["CategoryItems"],
  queryFn: () => fetchCategoryItemData(Id),
});
