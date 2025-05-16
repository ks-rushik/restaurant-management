"use server";

import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { IItemdata } from "@/app/components/item/AddItemModal";
import { createClient } from "@/app/utils/supabase/server";

const updateOrder = async (
  data: (IItemdata | ICategorydata)[],
  tablename: string,
) => {
  const supabase = await createClient();

  const updates = data.map(async (item, index) => {
    const { error } = await supabase
      .from(tablename)
      .update({ position: index })
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating item ID ${item.id}:`, error.message);
    }
  });

  await Promise.all(updates);
};

export default updateOrder;
