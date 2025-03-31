import React, { FC, ReactNode } from 'react'

type ISearchFilterProps = {
    children: ReactNode
}

const SearchFilter:FC<ISearchFilterProps> = (props) => {
    const {children} = props
  return (
    <div className=" justify-between items-center mb-3 sm:flex sm:flex-col md:flex md:flex-row lg:flex-row xl:flex-row">
      {children}
    </div>
  )
}

export default SearchFilter
