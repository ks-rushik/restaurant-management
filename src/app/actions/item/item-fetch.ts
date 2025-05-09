"use server";

import { Availablity, Jainoption } from "@/app/constants/common";
import { createClient } from "@/app/utils/supabase/server";

const fetchItemdata = async (
  categoryId: string,
  search?: string,
  status?: string,
) => {
  const supabase = await createClient();
  let query = supabase
    .from("Items")
    .select("*, category:category_id(menu:menu_id!inner(currency))")
    .eq("category_id", categoryId)
    .order("position", { ascending: true });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (status === Availablity.Available || status === Availablity.NotAvailable) {
    query = query.eq("status", status);
  }

  if (status === Jainoption.Jain || status === Jainoption.NotJain) {
    query = query.eq("jain", status);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};
export default fetchItemdata;
