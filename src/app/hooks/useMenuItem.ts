import { useQuery } from "@tanstack/react-query";
import fetchMenudata from "../actions/menu/menu-fetch";

const useMenuItem = (search: string = "", status: string = "All") => {
  const { data } = useQuery({
    queryKey: ["menu",search,status],
    queryFn: () => fetchMenudata(search, status),
    staleTime: 60 * 1000,
  });
  
  return data;
};

export default useMenuItem;