import fetchMenudata from "@/app/actions/menu/menu-fetch";
import Menu from "@/app/components/menu/MenuPage";
import Navbar from "@/app/components/navbar/Navbar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const Menupage = () => {
 queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: fetchMenudata,
    staleTime: Infinity
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <Menu />
    </HydrationBoundary>
  );
};
export default Menupage;
