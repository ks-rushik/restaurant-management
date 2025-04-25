"use server";
import { createClient } from "@/app/utils/supabase/server";
import { customAlphabet } from 'nanoid'

const shortLink = async(id: string) => {
  const supabase = await createClient();
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)
  const shortCode = nanoid(6);

  const { data: FetchedData } = await supabase
    .from("url")
    .select("*")
    .eq("menu_id", id);

  const existingId = FetchedData?.[0]?.menu_id

  if (existingId === id) {
    return;
  } else {
    const { data: InsertData } = await supabase
      .from("url")
      .insert([{ menu_id: id, short_url: shortCode }])
      .select();


    return InsertData?.[0];
  }
}
export default shortLink
