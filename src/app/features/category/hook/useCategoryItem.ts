import { useQuery } from "@tanstack/react-query";
import fetchCategorydata from "../../../actions/category/category-fetch";

const useMenuItem = (menuId : string) => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategorydata(menuId),
    staleTime:1000 * 60
  });

  return data;
};

export default useMenuItem;