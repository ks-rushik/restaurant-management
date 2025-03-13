import BaseTable from "@/app/components/ui/BaseTable";
import { FC } from "react";
import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";
import Loader from "@/app/components/ui/BaseLoader";
import { FaDownLong, FaUpLong } from "react-icons/fa6";

type ICategoryTableProps = {
  data: ICategorydata[] | undefined | null;
  handleSelectCategory: (item: ICategorydata) => void;
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  handleView: (category_name: string) => void;
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
    handleView,
    handleMoveUp,
    handleMoveDown,
    handleSelectCategory,
    handleDelete,
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
          render: (item) => (
            <div className="flex flex-row">
              <div onClick={() => handleMoveUp(item.position!)}>
                <FaUpLong size={22} />
              </div>
              <div onClick={() => handleMoveDown(item.position!)}>
                <FaDownLong size={22} />
              </div>
            </div>
          ),
        },
        {
          label: "CATEGORY NAME",
          render: (item) => item.category_name,
        },
        {
          label: "AVAILABILITY",
          render: (item) => item.status,
        },
        {
          label: "CREATED AT",
          render: (item) => {
            const date = new Date(item.create_at!);
            return IndianTime.format(date);
          },
        },
        {
          label: "",
          render: (item) => (
            <CategoryActions
              item={item}
              handleView={handleView}
              handleSelectCategory={handleSelectCategory}
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
//in this what if i want to give custom style to first up and down column using tailwind
