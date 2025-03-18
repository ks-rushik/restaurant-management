import { useQuery } from "@tanstack/react-query";
import fetchCategoryItemData from "../getData/getCategoryItem";

const useCategoriesItems = (Id : string) => {
  const { data } = useQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(Id),
    staleTime:1000 * 60
  });
 
  return data;
};

export default useCategoriesItems;