import { useQuery } from "@tanstack/react-query";
import fetchItemdata from "../actions/item/item-fetch";

const useItem = (categoryId : string) => {
  const { data } = useQuery({
    queryKey: ["Items" ,categoryId],
    queryFn: () => fetchItemdata(categoryId),
    staleTime:1000 * 60
  });

  return data;
};

export default useItem;