"use server";

import { ICategorydata } from "@/app/components/category/AddCategoryModal";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

const categories = async (CategoryData: ICategorydata, menuId: string) => {
  const supabase = await createClient();

  const { data: maxPositionData } = await supabase
    .from("category")
    .select("position")
    .eq("menu_id", menuId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const newPosition = maxPositionData ? (maxPositionData.position || 0) + 1 : 1;

  const categorydata = {
    menu_id: menuId,
    category_name: CategoryData.category_name,
    status: CategoryData.status,
    position: newPosition,
  };

  const { data: InsertData } = await supabase
    .from("category")
    .insert(categorydata)
    .select();


 // categorypage endpoint
  // type CategoryItem = {
  //   category_name: string;
  //   menu_id: string ;
  //   status: string;
  //   position:number
  // };

  // const Categories = async (items: CategoryItem[]) => {
  //   try {
  //     const { data } = await supabase.from('category').insert(items);
  //     console.log(data);
      
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //     return { success: false, error: 'Unexpected error occurred' };
  //   }
  // };
  // console.log(InsertData , 'categorydata');
  

  // const newItems = [
  //   {
  //     category_name: 'Appetizers',
  //     menu_id: menuId,
  //     status: 'Active',
  //     position: InsertData?.[0]?.position  + 1
  //   },
  //   {
  //     category_name : "Sandwitches",
  //     menu_id: menuId,
  //     status: 'InActive',
  //     position: InsertData?.[0].position + 2
  //   }
  // ];
  
  // Categories(newItems)

  revalidatePath("/", "layout");

  return InsertData?.[0];
};

export default categories;