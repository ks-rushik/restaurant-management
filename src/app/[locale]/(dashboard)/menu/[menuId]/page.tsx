import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchCategorydataQuery } from "@/app/actions/category/categoryfetchquery";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import CategoryPage from "@/app/components/category/CategoryPage";
import Navbar from "@/app/components/navbar/Navbar";
import { getDictionary, IMessages } from "@/app/[locale]/messages";

const queryClient = new QueryClient();

const page = async ({
  params,
}: {
  params: Promise<{ menuId: string; locale: "en" | "hd" | "sp" }>;
}) => {
  const { menuId } = await params;

  await queryClient.prefetchQuery(fetchCategorydataQuery(menuId, "", ""));
  await queryClient.prefetchQuery(fetchMenudataQuery("", ""));

  const locale = (await params).locale;
  const dictionary: IMessages = await getDictionary(locale);
  console.log(dictionary ,'dictonray');
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <CategoryPage lang={dictionary}  />
    </HydrationBoundary>
  );
};

export default page;
