import {
  Breadcrumbs,
  BreadcrumbsStylesNames,
  BreadcrumbsProps,
} from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

type IBreadcrumbItem = {
  title: string;
  href: string ;
};

type IBreadcrumbsProps = {
  items: IBreadcrumbItem[];
  separator?: string;
  separatorMargin?: string;
} & BreadcrumbsProps & {
    classNames?: Partial<Record<BreadcrumbsStylesNames, string>> | undefined;
  };

const CustomBreadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  const {
    items,
    separator = "/",
    separatorMargin = "md",
    classNames,
    ...other
  } = props;
  const { root, breadcrumb, ...otherelement } = classNames || {};

  return (
    <Breadcrumbs
      separator={separator}
      separatorMargin={separatorMargin}
      classNames={{
        root: clsx("pb-8  pl-1", root),
        breadcrumb: clsx(
          "font-md text-gray-500 hover:text-blue-400",
          breadcrumb
        ),
        ...otherelement,
      }}
      {...other}
    >
      {items.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <span className="inline-flex items-center">
              <span>{String(item.title || "Untitled")}</span>
            </span>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
