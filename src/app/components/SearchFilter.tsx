import React, { FC, ReactNode } from 'react'

type ISearchFilterProps = {
    children: ReactNode
}

const SearchFilter:FC<ISearchFilterProps> = (props) => {
    const {children} = props
  return (
    <div className=" flex flex-col gap-4 mb-4 justify-end md:flex-row">
      {children}
    </div>
  )
}

export default SearchFilter
