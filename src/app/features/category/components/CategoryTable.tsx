import BaseTable from "@/app/components/ui/BaseTable";
import { FC } from "react";
import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";

type ICategoryTableProps = {
  data: ICategorydata[] | undefined | null;
  handleSelectCategory: (item: ICategorydata) => void;
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
    handleSelectCategory,
    handleDelete,
    loading,
    opened,
    close,
  } = props;

  return !data ? (
    <p className="flex justify-center">Loading categories...</p>
  ) : data?.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">
      No Category available. Click "Add New Category" to create one.
    </p>
  ) : (
    <BaseTable
      highlightOnHover
      data={data!}
      getKey={(item) => item.id!}
      columns={[
        {
          label: "CATEGORY NAME",
          render: (item) => `${item.category_name}`,
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
