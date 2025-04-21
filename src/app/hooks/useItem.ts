import { useQuery } from "@tanstack/react-query";
import fetchItemdata from "../actions/item/item-fetch";

const useItem = (categoryId : string) => {
  const { data } = useQuery({
    queryKey: ["Items" ,categoryId],
    queryFn: () => fetchItemdata(categoryId),
    staleTime:60 * 1000
  });

  return data;
};

export default useItem;