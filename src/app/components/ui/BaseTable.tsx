import {
  Table,
  TableProps,
  TableStylesNames,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import BaseButton from "./BaseButton";

type IColumn<T> = {
  label: string;
  render: (item: T) => ReactNode;
  width?: string;
};

type IBaseTableProps<T> = TableProps & {
  classNames?: Partial<Record<TableStylesNames, string>>;
  columns: IColumn<T>[];
  data?: T[];
  getKey: (item: T) => string | number;
  initialSize?: number;
  loadMoreSize?: number;
};

const BaseTable = <T,>({
  classNames,
  columns,
  data,
  getKey,
  initialSize = 7,
  loadMoreSize = 7,
  ...other
}: IBaseTableProps<T>) => {
  const { table, th, td, thead, tbody, tr, ...otherElements } =
    classNames || {};
  const [visibleCount, setVisibleCount] = useState(initialSize);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreSize, data!.length));
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600  bg-white">
        <div className="w-full overflow-x-auto">
          <Table
            {...other}
            classNames={{
              thead: clsx(
                "font-semibold text-gray-600 text-sm bg-gray-300 dark:bg-gray-700  dak:!text-gray-200 h-14 ",
                thead
              ),
              tbody: clsx(
                "text-sm font-normal bg-white dark:text-white dark:bg-gray-700 ",
                tbody
              ),
              tr: clsx(
                "h-[55px] dark:border-gray-600",
                tr
              ),
              th: clsx("sm:min-w-24 min-w-48 dark:text-white ", th),
              td: clsx(" ", td),
              table: clsx("", table),
              ...otherElements,
            }}
          >
            <TableThead>
              <TableTr>
                {columns.map((col, index) => (
                  <TableTh key={index}>{col.label}</TableTh>
                ))}
              </TableTr>
            </TableThead>
            <TableTbody>
              {data?.map((row, index) => (
                <TableTr key={index}>
                  {columns.map((col, index) => (
                    <TableTd
                      key={index}
                      classNames={{
                        td: clsx("max-w-[200px] ", td),
                      }}
                    >
                      {col.render(row)}
                    </TableTd>
                  ))}
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </div>
      </div>

      {visibleCount < data!.length && (
        <div className="flex justify-center">
          <BaseButton onClick={handleLoadMore} className="mt-4">
            Load More
          </BaseButton>
        </div>
      )}
    </>
  );
};

export default BaseTable;
