"use server";
import { nanoid } from "nanoid";
import { createClient } from "@/app/utils/supabase/server";

export async function shortLink(id: string) {
  const supabase = await createClient();

  const shortUrl = nanoid(6);
  console.log(shortUrl, "this is shorturl");
  const shareableLink = `http://digidine.com/${shortUrl}`;

  const { data: InsertData, error } = await supabase
    .from("url")
    .insert([{ menu_id: id, short_url: shareableLink }])
    .select();
 console.log(InsertData?.[0]);
 
  if (error) {
    console.log(error, "inserting error");
  }

  return InsertData?.[0];
}
