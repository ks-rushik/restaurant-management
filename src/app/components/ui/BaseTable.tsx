import { Table, TableProps, TableStylesNames } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type IBaseTableProps = TableProps & {
  classNames?: Partial<Record<TableStylesNames, string>> | undefined;
};

const BaseTable: FC<IBaseTableProps> = (props) => {
  const { classNames, ...other } = props;
  const { table, th, tr, ...otherelements } = classNames || {};

  return (
    <div className="mx-2 md:mx-4 lg:mx-10 bg-white"> 
      <Table
        classNames={{
          table: clsx("rounded-2xl ", table),
          th: clsx("text-gray-600 text-sm font-bold", th),
          td: clsx('text-gray-500 text-sm font-semibold' , tr),
          ...otherelements,
        }}
        width={100}
        className="p-10"
        {...other}
      />
    </div>
  );
};

export default BaseTable;
