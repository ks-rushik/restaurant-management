import CustomerSide from "@/app/features/public/components/CustomerSide";
import React from "react";
import fetchCategoryItemData from "../features/public/getData/getCategoryItem";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../features/userprofile/actions/userprofile-fetch";
type SearchParams = Promise<{ id: string }>;
const queryClient = new QueryClient();
const PublicPage = async (props: { searchParams: SearchParams }) => {
  const { id } = await props.searchParams;
  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(id),
  });
  await queryClient.prefetchQuery({
    queryKey:['ProfileDetails'],
    queryFn:() => getUserProfile(),
    staleTime: 60 * 1000
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={id} />
    </HydrationBoundary>
  );
};

export default PublicPage;
