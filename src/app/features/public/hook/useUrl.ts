import { useQuery } from "@tanstack/react-query";
import getMenuData from "../actions/getMenuData";

const useShortUrl = (Id : string) => {
  const { data } = useQuery({
    queryKey: ["url"],
    queryFn: () => getMenuData(Id),
    staleTime:1000 * 60
  });
 
  return data;
};

export default useShortUrl;