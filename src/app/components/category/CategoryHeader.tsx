"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import useMenuItem from "@/app/hooks/useMenuItem";
import { notFound, usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

type ICategoryHeaderProps = {
  children: ReactNode;
};
const CategoryHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const segments = pathname.split("/")[1];
  const data = useMenuItem();
  const menuId = pathname.split("/")[2];
  const menu = data?.find((menu) => menu.id === menuId)?.menu_name;
  if (menu === undefined) {
    return notFound();
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments.slice(1),
      href: `/${segments}`,
    },
    {
      title: menu?.[0].toUpperCase() + menu?.slice(1),
      href: `#`,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Categories</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={breadcrumbItems} children={undefined} />
    </div>
  );
};
export default CategoryHeader;
