import { useQuery } from "@tanstack/react-query";
import fetchCategorydata from "../actions/category/category-fetch";

const useMenuItem = (menuId : string) => {
  const { data } = useQuery({
    queryKey: ["category" ,menuId],
    queryFn: () => fetchCategorydata(menuId),
    staleTime: Infinity
  });

  return data;
};

export default useMenuItem;