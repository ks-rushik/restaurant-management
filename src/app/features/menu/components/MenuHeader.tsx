import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { FC, ReactNode } from "react";
import { CgMenuBoxed } from "react-icons/cg";

type IMenuHeaderProps = {
  children: ReactNode;
};
const MenuHeader: FC<IMenuHeaderProps> = (props) => {
  const { children } = props;
  const item = [{ title: "Menus", icon: <CgMenuBoxed />, href: "/menu" }];
  return (
    <>
      <CustomBreadcrumbs items={item} children={undefined}></CustomBreadcrumbs>
      <div className="flex flex-row justify-between p-1 pb-8">
        <h1 className="text-2xl font-bold">Menus</h1>
        {children}
      </div>
    </>
  );
};

export default MenuHeader;
