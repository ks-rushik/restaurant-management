import fetchCategorydata from '@/app/features/category/actions/category-fetch';
import CategoryPage from '@/app/features/category/components/CategoryPage'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

export const queryClient = new QueryClient();

const page = async() => {
    await queryClient.prefetchQuery({
        queryKey:['category'],
        queryFn:fetchCategorydata
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
         <CategoryPage/>
    </HydrationBoundary>
   
  )
}

export default page
