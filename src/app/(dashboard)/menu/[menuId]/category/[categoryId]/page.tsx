import fetchCategoryItemData from '@/app/actions/customer/getCategoryItem';
import getItemData from '@/app/actions/item/getItemdata';
import fetchItemdata from '@/app/actions/item/item-fetch';
import ItemPage from '@/app/components/item/ItemPage'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const queryClient = new QueryClient();

const page = async({params}:{params:Promise<{categoryId:string, menuId: string}>}) => {
    const {categoryId ,menuId} = await params;
    
      await queryClient.prefetchQuery({
          queryKey:['Items'],
          queryFn:() => fetchItemdata(categoryId)
      })
      await queryClient.prefetchQuery({
        queryKey: ['CategoryItems'] ,
        queryFn: () => fetchCategoryItemData(menuId)
      })
      await queryClient.prefetchQuery({
        queryKey:['Itemdata'],
        queryFn: ()=>getItemData(categoryId),
      })
    
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
           <ItemPage/>
      </HydrationBoundary>
     
    )
  }

export default page
