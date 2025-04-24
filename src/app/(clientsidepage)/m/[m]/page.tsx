import fetchMenudata from "@/app/actions/menu/menu-fetch";
import fetchCategoryItemData from "@/app/actions/customer/getCategoryItem";
import getMenuData from "@/app/actions/customer/getMenuData";
import { getProfileData } from "@/app/actions/customer/getProfileData";
import CustomerSide from "@/app/components/customer/CustomerSide";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const page = async ({ params }: { params: Promise<{ m: string }> }) => {
  const { m } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["url"],
    queryFn: () => getMenuData(m),
  });
  const data: { menu_id: any }[] | undefined = queryClient.getQueryData([
    "url",
  ]);
  const menuId = data?.[0].menu_id;

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
    queryFn: () => fetchMenudata(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={m} />
    </HydrationBoundary>
  );
};

export default page;
