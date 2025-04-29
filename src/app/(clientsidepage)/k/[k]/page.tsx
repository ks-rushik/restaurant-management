import fetchCategoryItemData from "@/app/actions/customer/getCategoryItem";
import getMenuData from "@/app/actions/customer/getMenuData";
import { getProfileData } from "@/app/actions/customer/getProfileData";
import fetchMenudata from "@/app/actions/menu/menu-fetch";
import CustomerSide from "@/app/components/customer/CategoryBased/CustomerSide";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ k: string }> }) => {
  const { k } = await params;
  
  const data = await queryClient.fetchQuery({
    queryKey: ["url"],
    queryFn: () => getMenuData(k),
  });
  

  const menuId = data?.[0]?.menu_id;

  if (!menuId || !params) {
    return notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["CategoryBasedItems"],
    queryFn: () => fetchCategoryItemData(menuId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["ProfileDetails"],
    queryFn: () => getProfileData(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["menu"],
    queryFn: () => fetchMenudata,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={k} />
    </HydrationBoundary>
  );
};

export default page;
