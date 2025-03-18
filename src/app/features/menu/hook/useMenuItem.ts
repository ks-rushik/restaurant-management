import { useQuery } from "@tanstack/react-query";
import fetchMenudata from "../actions/menu-fetch";

const useMenuItem = () => {
  const { data } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenudata,
    staleTime:1000 * 60
  });

  return data;
};

export default useMenuItem;
