import BaseTable from "@/app/components/ui/BaseTable";
import { FC, useState } from "react";
import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";
import Loader from "@/app/components/ui/BaseLoader";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import formatDate from "@/app/utils/formatdate";
import SearchInput from "../SearchInput";
import SearchFilter from "../SearchFilter";
import FilteredData from "../FilterData";

type ICategoryTableProps = {
  data: ICategorydata[] | undefined | null;
  handleSelectCategory: (item: ICategorydata) => void;
  handleView: (id: string) => void;
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

const CategoryTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleView,
    handleSelectCategory,
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    loading,
    opened,
    close,
  } = props;
  const [searchData, setSearchData] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  let filteredData = data
    ? data.filter((item) =>
        item?.category_name?.toLowerCase().includes(searchData.toLowerCase())
      )
    : [];

  if (filterStatus === "Available") {
    filteredData = filteredData?.filter(
      (item) => item.status?.toLowerCase() === "available"
    )!;
  } else if (filterStatus === "Not Available") {
    filteredData = filteredData?.filter(
      (item) => item.status?.toLowerCase() === "not available"
    )!;
  }

  return !data ? (
    <Loader></Loader>
  ) : data?.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">
      No Category available. Click "Add New Category" to create one.
    </p>
  ) : (
    <>
      <SearchFilter>
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Search Category..."
        />
        <FilteredData
          value={filterStatus}
          onChange={(value) => setFilterStatus(value || "All")}
        />
      </SearchFilter>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No matching categories found.
        </p>
      ) : (
        <BaseTable
          data={filteredData}
          classNames={{
            th: "text-gray-600 text-sm h-12 font-bold [&:first-child]:w-[70px] ",
            td: "text-gray-500 text-sm h-12 font-semibold [&:first-child]:w-[70px] ",
          }}
          getKey={(item) => item.id!}
          columns={[
            {
              label: "",
              render: (item) => {
                const index = data!.findIndex(
                  (dataItem) => dataItem.id === item.id
                );
                return (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-white dark:hover:text-gray-500"
                    >
                      <FaUpLong />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === data!.length - 1}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-white dark:hover:text-gray-500"
                    >
                      <FaDownLong />
                    </button>
                  </div>
                );
              },
            },
            {
              label: "CATEGORY NAME",
              render: (item) => item.category_name,
            },
            {
              label: "AVAILABILITY",
              render: (item) =>
                item.status === "Not Available" ? (
                  <p className="text-red-500">Not Available</p>
                ) : (
                  <p className="text-green-600">Available</p>
                ),
            },
            {
              label: "CREATED AT",
              render: (item) => formatDate(item.create_at!),
            },
            {
              label: "UPDATED AT",
              render: (item) => formatDate(item.updated_at!),
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
      )}
    </>
  );
};

export default CategoryTable;
