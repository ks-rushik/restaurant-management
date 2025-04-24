import { useQuery } from "@tanstack/react-query";
import fetchCategorydata from "../actions/category/category-fetch";

const useCategoryItem = (menuId: string, search: string ='', status: string ='Available') => {
  const { data } = useQuery({
    queryKey: ["category", menuId ,search ,status],
    queryFn: () => fetchCategorydata(menuId, search, status),
    staleTime: 60 * 1000,
  });
console.log(data,'hookdata');

  return data;
};

export default useCategoryItem;
