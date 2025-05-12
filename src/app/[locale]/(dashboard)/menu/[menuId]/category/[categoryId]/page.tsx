import React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { IMessages, getDictionary } from "@/app/[locale]/messages";
import { fetchcategoryitemdataQuery } from "@/app/actions/item/categorymenufetchquery";
import { fetchItemdataQuery } from "@/app/actions/item/itemfetchquery";
import ItemPage from "@/app/components/item/ItemPage";
import Navbar from "@/app/components/navbar/Navbar";

const queryClient = new QueryClient();

const page = async ({
  params,
}: {
  params: Promise<{
    categoryId: string;
    locale: "en" | "hd" | "sp";
  }>;
}) => {
  const { categoryId } = await params;

  await queryClient.prefetchQuery(fetchItemdataQuery(categoryId, ""));

  await queryClient.prefetchQuery(fetchcategoryitemdataQuery(categoryId));
  const locale = (await params).locale;
  const dictionary: IMessages = await getDictionary(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemPage lang={dictionary} />
    </HydrationBoundary>
  );
};

export default page;
