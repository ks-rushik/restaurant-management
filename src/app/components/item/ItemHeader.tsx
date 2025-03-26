"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import useItemData from "@/app/hooks/useItemData";
import { usePathname, notFound, redirect } from "next/navigation";
import { FC, ReactNode } from "react";

type ICategoryHeaderProps = {
  children: ReactNode;
};

const ItemHeader: FC<ICategoryHeaderProps> = ({ children }) => {
  const pathname = usePathname();
  const segments = pathname.split("/")[1];
  const menuId = pathname.split("/")[2];
  const categoryId = pathname.split("/")[4];
  const items = useItemData(categoryId);
  const itemname = items?.[0].category_name;
  const categoryname = items?.[0].menus?.menu_name;
  
  if (!itemname) {
    return notFound();
  }

  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments?.slice(1),
      href: `/${segments}`,
    },
    {
      title: categoryname?.[0].toUpperCase() + categoryname?.slice(1),
      href: `/menu/${menuId}`,
    },
    {
      title: itemname?.[0].toUpperCase() + itemname?.slice(1),
      href: `#`,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Items</h1>
        {children}
      </div>
      <CustomBreadcrumbs
        items={breadcrumbItems}
        separatorMargin="xs"
        children={undefined}
      />
    </div>
  );
};

export default ItemHeader;
