import { useQuery } from "@tanstack/react-query";
import fetchCategorydata from "../actions/category-fetch";

const useMenuItem = () => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategorydata,
    staleTime:1000 * 60
  });

  return data;
};

export default useMenuItem;