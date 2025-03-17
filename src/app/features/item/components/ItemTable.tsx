import BaseTable from "@/app/components/ui/BaseTable";
import { FC } from "react";
import ItemActions from "./ItemActions";
import Loader from "@/app/components/ui/BaseLoader";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import { IItemdata } from "./AddItemModal";

type ICategoryTableProps = {
  data: IItemdata[] | undefined | null;
  handleMoveUp: (index: number) => void; 
  handleMoveDown: (index: number) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const IndianTime = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const CategoryTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    loading,
    opened,
    close,
  } = props;

  return !data ? (
    <Loader></Loader>
  ) : data?.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">
      No Category available. Click "Add New Category" to create one.
    </p>
  ) : (
    <BaseTable
      highlightOnHover
      classNames={{
        th: "text-gray-600 text-sm h-12 font-bold [&:first-child]:w-[70px] ",
        td: "text-gray-500 text-sm h-12 font-semibold [&:first-child]:w-[70px] ",
      }}
      data={data!}
      getKey={(item) => item.id!}
      columns={[
        {
          label: "", 
          render: (item) => {
            const index = data!.findIndex((dataItem) => dataItem.id === item.id);
            return (
              <div className="flex gap-1">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0} 
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <FaUpLong />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === data!.length - 1} 
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <FaDownLong />
                </button>
              </div>
            );
          },
        },
        {
          label: "ITEM NAME",
          render: (item) => item.name,
        },
        {
          label: "AVAILABILITY",
          render: (item) => item.status,
        },
        {
            label:"DESCRIPTION",
            render: (item) => item.description
        },
        {
           label:"PRICE",
           render: (item) => item.price  
        },
        {
          label: "CREATED AT",
          render: (item) => {
            const date = new Date(item.created_at!);
            return IndianTime.format(date);
          },
        },
        
        {
          label: "",
          render: (item) => (
            <ItemActions
              item={item}
              handleDelete={handleDelete}
              loading={loading}
              opened={opened}
              close={close}
            />
          ),
        },
      ]}
    />
  );
};

export default CategoryTable;
