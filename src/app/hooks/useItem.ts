import { useQuery } from "@tanstack/react-query";
import fetchItemdata from "@/app/actions/item/item-fetch";

const useItem = (categoryId : string , search: string ='', status: string ='Available') => {
  const { data } = useQuery({
    queryKey: ["Items" ,categoryId ,search ,status],
    queryFn: () => fetchItemdata(categoryId, search, status),
    staleTime:60 * 1000
  });

  return data;
};

export default useItem;