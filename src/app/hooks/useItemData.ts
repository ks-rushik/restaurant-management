import { useQuery } from "@tanstack/react-query";
import getItemdata from "@/app/actions/item/getItemdata";

const useItemData = (Id : string) => {
  const { data } = useQuery({
    queryKey: ["Itemdata" ,Id],
    queryFn: () => getItemdata(Id),
    staleTime: 60 * 1000
  });
 
  return data;
};

export default useItemData;