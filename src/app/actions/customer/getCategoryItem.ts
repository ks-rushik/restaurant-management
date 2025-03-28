"use server";
import { createClient } from "@/app/utils/supabase/server";

const fetchCategoryItemData = async (id: string) => {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("category")
    .select("*, menus(*, restaurant_id(*)), Items(*)")
    .eq("menu_id", id)
    .order("position", { ascending: true });
 
  const sortedCategories = categories?.map((category) => {
    if (category.Items) {
      category.Items.sort(
        (a: { position: number }, b: { position: number }) =>
          a.position - b.position
      );
    }
    return category;
  });

  return { categories: sortedCategories };
};

export default fetchCategoryItemData;
