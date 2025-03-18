import { Table, TableProps, TableStylesNames } from "@mantine/core";
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
  const { table, th, td, thead, ...otherelements } = classNames || {};
  const [visibleCount, setVisibleCount] = useState(initialSize);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreSize, data!.length));
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="w-full overflow-x-auto">
          <Table
            classNames={{
              table: clsx("w-full table-auto", table),
              thead: clsx("text-bold", thead),
              th: clsx("text-gray-600 text-sm font-bold px-4 py-2", th),
              td: clsx("text-gray-500 text-sm px-4 py-2", td),
              ...otherelements,
            }}
            {...other}
          >
            <Table.Thead>
              <Table.Tr>
                {columns.map((col, index) => (
                  <Table.Th
                    key={index}
                    className={clsx(
                      col.width ? `w-[${col.width}]` : "w-auto",
                      "p-3"
                    )}
                  >
                    {col.label}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.slice(0, visibleCount).map((row) => (
                <Table.Tr key={getKey(row)} className="hover:bg-gray-100">
                  {columns.map((col, index) => (
                    <Table.Td
                      key={index}
                      className={clsx(
                        col.width ? `w-[${col.width}]` : "w-auto",
                        col.label === "DESCRIPTION"
                          ? "max-w-[200px] whitespace-normal break-words overflow-auto"
                          : "",
                        "p-3"
                      )}
                    >
                      {col.render(row)}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
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
