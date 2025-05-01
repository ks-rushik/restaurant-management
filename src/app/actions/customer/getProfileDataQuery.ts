import getItemData from "../item/category-menu-fetch";

export const getProfileDataQuery = (Id: string) => ({
  queryKey: ["Itemdata", Id],
  queryFn: () => getItemData(Id),
});
