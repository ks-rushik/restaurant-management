import getItemData from "./category-menu-fetch";

export const fetchcategoryitemdataQuery = (Id: string) => ({
  queryKey: ["Itemdata", Id],
  queryFn: () => getItemData(Id),
});
