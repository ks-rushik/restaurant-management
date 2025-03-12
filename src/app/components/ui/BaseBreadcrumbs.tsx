import {
  Breadcrumbs,
  Anchor,
  BreadcrumbsStylesNames,
  BreadcrumbsProps,
} from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { FC, ReactNode } from "react";

type IBreadcrumbItem = {
  title: string;
  href: string;
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
        root: clsx(" pt-8 pl-1", root),
        breadcrumb: clsx(
          "font-md font-bold text-black hover:text-blue-400",
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
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
