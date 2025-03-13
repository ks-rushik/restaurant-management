import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { FC, ReactNode } from "react";

type IMenuHeaderProps = {
  children: ReactNode;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children } = props;
  const item = [{ title: "Menus", href: "/menu" }];
  return (
    <>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Menus</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={item} children={undefined}></CustomBreadcrumbs>
    </>
  );
};

export default MenuHeader;
