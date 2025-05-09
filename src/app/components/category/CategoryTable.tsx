import Image from "next/image";
import { FC } from "react";

import FilteredData from "@components/FilterData";
import SearchFilter from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import { FaDownLong, FaUpLong } from "react-icons/fa6";

import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity } from "@/app/constants/common";
import formatDate from "@/app/utils/formatdate";

import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";

type ICategoryTableProps = {
  data: ICategorydata[] | undefined | null;
  handleSelectCategory: (item: ICategorydata) => void;
  handleView: (id: string) => void;
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
  searchData: string;
  setSearchData: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
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
    searchData,
    setSearchData,
    filterStatus,
    setFilterStatus,
  } = props;

  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilter>
        <SearchInput
          placeholder="Search Category"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <FilteredData
          value={filterStatus}
          data={[Availablity.Available, Availablity.NotAvailable, "All"]}
          onChange={(value) => setFilterStatus(value || "")}
        />
      </SearchFilter>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Category found.</p>
      ) : (
        <BaseTable
          data={data}
          classNames={{
            th: "[&:first-child]:w-[70px] ",
            td: "[&:first-child]:w-[70px] ",
          }}
          getKey={(item) => item.id!}
          columns={[
            {
              label: "",
              render: (item) => {
                const index = data!.findIndex(
                  (dataItem) => dataItem.id === item.id,
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
              label: "IMAGE",
              render: (item) =>
                item.image && (
                  <Image
                    src={item.image as unknown as string}
                    width={70}
                    height={70}
                    alt={item.category_name || "Item image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ),
            },
            {
              label: "CATEGORY NAME",
              render: (item) => item.category_name,
            },
            {
              label: "AVAILABILITY",
              render: (item) =>
                item.status === Availablity.NotAvailable ? (
                  <p className="text-red-500">{Availablity.NotAvailable}</p>
                ) : (
                  <p className="text-green-600">{Availablity.Available}</p>
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
