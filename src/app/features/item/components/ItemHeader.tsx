"use client";
import CustomBreadcrumbs from "@/app/components/ui/BaseBreadcrumbs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

type ICategoryHeaderProps = {
  children: ReactNode;
};
const ItemHeader: FC<ICategoryHeaderProps> = (props) => {
  const { children } = props;
  const searchParam = useSearchParams();
  const name = searchParam.get("name")!;
  const menuname = searchParam.get("menuname")!;
  const pathname = usePathname();

  const segments = pathname.split("/")[1];
  const menuId = pathname.split('/')[2];
  
  const breadcrumbItems = [
    {
      title: segments[0].toUpperCase() + segments.slice(1),
      href: `/${segments}`,
    },
    {
        title: menuname[0].toUpperCase() + menuname.slice(1),
        href:`/menu/${menuId}?name=${menuname}`
    },
    {
      title: name[0].toUpperCase() + name?.slice(1),
      href: `#`,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between pt-8 pl-1">
        <h1 className="text-2xl font-bold">Items</h1>
        {children}
      </div>
      <CustomBreadcrumbs items={breadcrumbItems} children={undefined} />
    </div>
  );
};
export default ItemHeader;
