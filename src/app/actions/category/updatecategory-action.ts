"use server";

import { revalidatePath } from "next/cache";

import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { createClient } from "@/app/utils/supabase/server";

export async function updateCategory(
  CategoryData: ICategorydata,
  menuId: string,
  file?: File,
) {
  const supabase = await createClient();

  if (file && file.size > 0) {
    const fileName = `${file.name}`;
    const { error } = await supabase.storage
      .from("category")
      .upload(fileName, file, { upsert: true });

    if (error) {
      throw new Error(`Failed to upload logo: ${error.message}`);
    }
    const { data } = supabase.storage.from("category").getPublicUrl(fileName);
    const imageUrl = data.publicUrl;

    const CategorySupabaseData = {
      menu_id: menuId,
      category_name: CategoryData.category_name,
      status: CategoryData.status,
      image: imageUrl,
    };
    const { data: UpdatedData, error: UpdateError } = await supabase
      .from("category")
      .update(CategorySupabaseData)
      .eq("id", CategoryData.id)
      .select();

    return UpdatedData?.[0];
  }

  const categorydata = {
    menu_id: menuId,
    category_name: CategoryData.category_name,
    status: CategoryData.status,
  };

  const { data: UpdatedData } = await supabase
    .from("category")
    .update(categorydata)
    .eq("id", CategoryData.id!)
    .select();

  return UpdatedData?.[0];
}
