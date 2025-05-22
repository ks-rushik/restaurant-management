"use server";

import { PAGE_SIZE } from "@/app/actions/menu/menufetchquery";
import { IItemdata } from "@/app/components/item/AddItemModal";
import { IFilter } from "@/app/components/item/ItemPage";
import { Availablity, Jainoption } from "@/app/constants/common";
import { createClient } from "@/app/utils/supabase/server";

const fetchItemdata = async (
  pageParam: number,
  categoryId: string,
  search?: string,
  filters?: IFilter,
): Promise<{ data: IItemdata[]; count: number | null }> => {
  const supabase = await createClient();
  let query = supabase
    .from("Items")
    .select("*, category:category_id(menu:menu_id!inner(currency))", {
      count: "exact",
    })
    .eq("category_id", categoryId)
    .order("position", { ascending: true });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (
    filters?.avaibilityStatus === Availablity.Available ||
    filters?.avaibilityStatus === Availablity.NotAvailable
  ) {
    query = query.eq("status", filters.avaibilityStatus);
  }

  if (
    filters?.jainOption === Jainoption.Jain ||
    filters?.jainOption === Jainoption.NotJain
  ) {
    query = query.eq("jain", filters?.jainOption);
  }
  query = query.range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) throw error;

  return { data, count };
};
export default fetchItemdata;
