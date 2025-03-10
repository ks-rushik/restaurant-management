import { Table, TableProps, TableStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseTableProps = TableProps & {
  classNames?: Partial<Record<TableStylesNames, string>> | undefined;
};

const BaseTable: FC<IBaseTableProps> = (props) => {
  const { classNames, ...other } = props;
  const { table, th, tr, td, thead, ...otherelements } = classNames || {};

  return (
    <Table
      classNames={{
        table: clsx(
          "rounded-2xl m-8 border border-gray-300 bg-white w-full",
          table
        ),
        thead: clsx("text-bold p-8", thead),
        th: clsx("text-gray-600 text-sm font-bold", th),
        td: clsx("text-gray-500 text-sm font-semibold", td),
        tr: clsx("h-14"),
        ...otherelements,
      }}
      {...other}
    >
     
    </Table>
  );
};

export default BaseTable;
