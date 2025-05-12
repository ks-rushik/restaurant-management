import { IFilter } from "@/app/components/item/ItemPage";

import fetchItemdata from "./item-fetch";

export const fetchItemdataQuery = (
  categoryId: string,
  search?: string,
  filters?: IFilter,
) => ({
  queryKey: [
    "Items",
    categoryId,
    search,
    filters?.avaibilityStatus,
    filters?.jainOption,
  ],
  queryFn: () => fetchItemdata(categoryId, search, filters),
});
