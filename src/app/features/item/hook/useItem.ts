import { useQuery } from "@tanstack/react-query";
import fetchItemdata from "../actions/item-fetch";

const useItem = (categoryId : string) => {
  const { data } = useQuery({
    queryKey: ["Items"],
    queryFn: () => fetchItemdata(categoryId),
    staleTime:1000 * 60
  });

  return data;
};

export default useItem;