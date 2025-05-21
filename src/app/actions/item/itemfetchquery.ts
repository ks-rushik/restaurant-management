import { IItemdata } from "@/app/components/item/AddItemModal";
import { IFilter } from "@/app/components/item/ItemPage";

import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";
import fetchItemdata from "@/app/actions/item/item-fetch";

export const fetchItemdataQuery = (
  categoryId: string,
  search?: string,
  filters?: IFilter,
) => ({
  queryKey: ["Items", categoryId, search, filters],
  queryFn: ({ pageParam = 0 }) =>
    fetchItemdata(pageParam, categoryId, search, filters),
  getNextPageParam: (lastPage: IItemdata[], allPages: IItemdata[][]) => {
    if (lastPage.length < PAGE_SIZE) return undefined;

    return allPages.length;
  },
  initialPageParam: 0,
});
