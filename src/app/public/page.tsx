import CustomerSide from "@/app/features/public/components/CustomerSide";
import React from "react";
import fetchCategoryItemData from "../features/public/getData/getCategoryItem";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
type SearchParams = Promise<{ id: string }>;
const queryClient = new QueryClient();
const PublicPage = async (props: { searchParams: SearchParams }) => {
  const { id } = await props.searchParams;
  console.log(id);
  await queryClient.prefetchQuery({
    queryKey: ["CategoryItems"],
    queryFn: () => fetchCategoryItemData(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerSide id={id} />
    </HydrationBoundary>
  );
};

export default PublicPage;
