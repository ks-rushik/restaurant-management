import fetchMenudata from "@/app/actions/menu/menu-fetch";
import fetchCategoryItemData from "@/app/actions/customer/getCategoryItem";
import getMenuData from "@/app/actions/customer/getMenuData";
import { getProfileData } from "@/app/actions/customer/getProfileData";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { notFound } from "next/navigation";
import CustomerSide from "@/app/components/customer/ItemBased/CustomerSide";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ m: string }> }) => {
  const { m } = await params;
  const data = await queryClient.fetchQuery({
    queryKey: ["url"],
    queryFn: () => getMenuData(m),
  });
    
  const menuId = data?.[0]?.menu_id;
  
  if(!menuId || !params){
    return notFound()
  }

  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
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
      <CustomerSide id={m} />
    </HydrationBoundary>
  );
};

export default page;
