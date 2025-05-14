import React, { FC, ReactNode } from "react";

type ISearchFilterWrapperProps = {
  children: ReactNode;
};

const SearchFilterWrapper: FC<ISearchFilterWrapperProps> = (props) => {
  const { children } = props;
  return (
    <div className=" flex flex-row gap-4 mb-4 justify-end">{children}</div>
  );
};

export default SearchFilterWrapper;
