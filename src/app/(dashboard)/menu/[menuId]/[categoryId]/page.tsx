import fetchItemdata from '@/app/features/item/actions/item-fetch';
import ItemPage from '@/app/components/item/ItemPage'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const queryClient = new QueryClient();

const page = async({params}:{params:Promise<{categoryId:string}>}) => {
    const {categoryId} = await params;
    
      await queryClient.prefetchQuery({
          queryKey:['Items'],
          queryFn:() => fetchItemdata(categoryId)
      })
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
           <ItemPage/>
      </HydrationBoundary>
     
    )
  }

export default page
