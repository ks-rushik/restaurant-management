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
  href: string;
  active?:boolean
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
          "font-md text-gray-500 hover:text-blue-400 dark:text-gray-600",
          breadcrumb
        ),
        ...otherelement,
      }}
      {...other}
    >
      {items.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <span
              className={` ${
                item.active
                  ? "text-gray-800 dark:text-gray-400  pointer-events-none"
                  : "hover:underline "
              }inline-flex items-center `}
            >
              <span>{String(item.title || "Untitled")}</span>
            </span>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
