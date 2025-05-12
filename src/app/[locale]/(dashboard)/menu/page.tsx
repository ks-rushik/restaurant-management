import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import Menu from "@/app/components/menu/MenuPage";
import Navbar from "@/app/components/navbar/Navbar";

import { IMessages, getDictionary } from "../../messages";

const queryClient = new QueryClient();

const Menupage = async ({
  params,
}: Readonly<{
  params: { locale: "en" | "hd" | "sp" };
}>) => {
  await queryClient.prefetchQuery(fetchMenudataQuery("", ""));

  const locale = (await params).locale;
  const dictionary: IMessages = await getDictionary(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <Menu lang={dictionary} />
    </HydrationBoundary>
  );
};

export default Menupage;
