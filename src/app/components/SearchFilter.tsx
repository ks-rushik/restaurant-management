import React, { FC, ReactNode } from 'react'

type ISearchFilterProps = {
    children: ReactNode
}

const SearchFilter:FC<ISearchFilterProps> = (props) => {
    const {children} = props
  return (
    <div className="flex flex-row justify-between items-center mb-3">
      {children}
    </div>
  )
}

export default SearchFilter
