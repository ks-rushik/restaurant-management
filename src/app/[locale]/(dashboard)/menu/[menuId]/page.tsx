import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { IMessages, getDictionary } from "@/app/[locale]/messages";
import { fetchCategorydataQuery } from "@/app/actions/category/categoryfetchquery";
import { fetchMenudataQuery } from "@/app/actions/menu/menufetchquery";
import CategoryPage from "@/app/components/category/CategoryPage";
import DictionaryProvider from "@/app/components/context/Dictionary";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DictionaryProvider value={dictionary}>
        <CategoryPage />
      </DictionaryProvider>
    </HydrationBoundary>
  );
};

export default page;
