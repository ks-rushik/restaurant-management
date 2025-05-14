import React, { FC, ReactNode } from "react";

export type ILanguageSelectorWrapperProps = {
  children: ReactNode;
};

const LanguageSelectorWrapper: FC<ILanguageSelectorWrapperProps> = (props) => {
  const { children } = props;
  return (
    <div className="flex justify-center absolute top-4 right-4">{children}</div>
  );
};

export default LanguageSelectorWrapper;
