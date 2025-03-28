import { Table, TableProps, TableStylesNames } from "@mantine/core";
import { MouseEventHandler, ReactNode, useState } from "react";
import clsx from "clsx";
import BaseButton from "./BaseButton";

type IColumn<T> = {
  label: string;
  render: (item: T) => ReactNode;
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
    <div className="flex items-center w-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
      <div className="w-full overflow-x-auto">
        <Table
          classNames={{
            table: clsx("w-full min-w-[600px]", table),
            thead: clsx("text-bold p-8 ", thead),
            th: clsx("text-gray-600 text-sm h-12 font-bold  ", th),
            td: clsx("text-gray-500 text-sm h-12 font-semibold ", td),
            ...otherelements,
          }}
          {...other}
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((col, index) => (
                <Table.Th key={index}>{col.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.slice(0, visibleCount).map((row) => (
              <Table.Tr
                key={getKey(row)}
            
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                {columns.map((col, index) => (
                  <Table.Td key={index}>{col.render(row)}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
      { visibleCount < data!.length && (
        <BaseButton onClick={handleLoadMore} className="mt-4">
          Load More
        </BaseButton>
      )}
    </div>
  );
};

export default BaseTable;