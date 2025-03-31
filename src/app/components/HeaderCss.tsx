import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { FC, ReactNode } from "react";

type IMenuHeaderProps = {
  children: ReactNode;
  item: {
    title: string;
    href: string;
  }[];
  headertitle: string
};
const HeaderCss: FC<IMenuHeaderProps> = (props) => {
  const { children , item ,headertitle } = props;

  return (
    <>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">{headertitle}</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={item} children={undefined}></CustomBreadcrumbs>
    </>
  );
};

export default HeaderCss;
