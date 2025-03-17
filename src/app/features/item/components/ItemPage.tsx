import React from 'react'
import ItemHeader from './ItemHeader'
import BaseButton from '@/app/components/ui/BaseButton'

const ItemPage = () => {
  return (
    <div className="items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-32">
      <ItemHeader >
        <BaseButton> Add New Item</BaseButton>
      </ItemHeader>
    </div>
  )
}

export default ItemPage
