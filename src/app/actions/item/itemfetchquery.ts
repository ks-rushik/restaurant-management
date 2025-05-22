import fetchItemdata from "@/app/actions/item/item-fetch";
import { IItemdata } from "@/app/components/item/AddItemModal";
import { IFilter } from "@/app/components/item/ItemPage";

export type IPage = { data: IItemdata[]; count: number | null };

export const fetchItemdataQuery = (
  categoryId: string,
  search?: string,
  filters?: IFilter,
) => ({
  queryKey: ["Items", categoryId, search, filters],
  queryFn: ({ pageParam = 0 }) =>
    fetchItemdata(pageParam, categoryId, search, filters),
  getNextPageParam: (lastPage: IPage, allPages: IPage[]) => {
    const totalFetched = allPages.reduce(
      (sum, page) => sum + page.data.length,
      0,
    );
    const totalAvailable = lastPage.count ?? 0;
    console.log(
      totalAvailable,
      totalFetched,
      "this is available and totalfetched",
    );

    return totalFetched < totalAvailable ? allPages.length : undefined;
  },
  initialPageParam: 0,
});
