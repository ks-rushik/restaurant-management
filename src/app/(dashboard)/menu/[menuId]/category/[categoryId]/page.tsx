import fetchCategoryItemData from "@/app/actions/customer/getCategoryItem";
import getItemData from "@/app/actions/item/getItemdata";
import fetchItemdata from "@/app/actions/item/item-fetch";
import ItemPage from "@/app/components/item/ItemPage";
import Navbar from "@/app/components/navbar/Navbar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const page = async ({
  params,
}: {
  params: Promise<{ categoryId: string; menuId: string }>;
}) => {
  const { categoryId, menuId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["Items" ,categoryId],
    queryFn: () => fetchItemdata(categoryId),
    staleTime: Infinity
  });
  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(menuId),
    staleTime: Infinity
  });
  await queryClient.prefetchQuery({
    queryKey: ["Itemdata" ,categoryId],
    queryFn: () => getItemData(categoryId),
    staleTime: Infinity
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <ItemPage />
    </HydrationBoundary>
  );
};

export default page;
