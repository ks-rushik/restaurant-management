import { Database } from "../../../../../database.types";

export type IModalData = {
  currency: string;
  id?: string;
  menu_name: string;
  status: string;
}
export type IMenudata = Database["public"]["Tables"]["menus"]["Row"];
