import { useQuery } from "@tanstack/react-query";
import getItemdata from "../actions/item/getItemdata";

const useItemData = (Id : string) => {
  const { data } = useQuery({
    queryKey: ["Itemdata" ,Id],
    queryFn: () => getItemdata(Id),
    staleTime:1000 * 60
  });
 
  return data;
};

export default useItemData;