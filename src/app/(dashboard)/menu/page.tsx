import fetchMenudata from "@/app/actions/menu/menu-fetch";
import Menu from "@/app/components/menu/MenuPage";
import Navbar from "@/app/components/navbar/Navbar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const Menupage = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["menu","" ,""],
    queryFn: () => fetchMenudata("" ,""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <Menu />
    </HydrationBoundary>
  );
};
export default Menupage;
