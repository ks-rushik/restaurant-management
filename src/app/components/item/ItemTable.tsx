import BaseTable from "@/app/components/ui/BaseTable";
import { FC, useState } from "react";
import ItemActions from "./ItemActions";
import Loader from "@/app/components/ui/BaseLoader";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import { IItemdata } from "./AddItemModal";
import formatDate from "@/app/utils/formatdate";
import Image from "next/image";
import { Availablity } from "@/app/constants/common";
import SearchInput from "../SearchInput";
import SearchFilter from "../SearchFilter";
import FilteredData from "../FilterData";

type ICategoryTableProps = {
  data: IItemdata[] | undefined | null;
  handleMoveUp: (index: number) => void;
  handleSelectItem: (item: IItemdata) => void;
  handleMoveDown: (index: number) => void;
  handleDelete: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  loading: string;
  opened: boolean;
  close: () => void;
};

const ItemTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleDelete,
    handleSelectItem,
    handleMoveUp,
    handleMoveDown,
    loading,
    opened,
    close,
  } = props;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchData, setSearchData] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  let filteredData = data
    ? data.filter((item) =>
        item?.name?.toLowerCase().includes(searchData.toLowerCase())
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
          placeholder="Search Item..."
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
          classNames={{
            th: "text-gray-600 text-sm h-12 font-bold  [&:first-child]:w-[60px] ",
            td: "text-gray-500 text-sm  font-semibold [&:first-child]:w-[60px] ",
          }}
          data={filteredData}
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
              label: "IMAGE",
              render: (item) =>
                item.image && (
                  <Image
                    src={item.image as unknown as string}
                    width={70}
                    height={70}
                    alt={item.name || "Item image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ),
            },
            {
              label: "ITEM NAME",
              render: (item) => item.name,
            },

            {
              label: "DESCRIPTION",
              render: (item) => (
                <span
                  className={`cursor-pointer ${
                    expandedRow === item.id
                      ? ""
                      : "truncate block max-w-[200px]"
                  }`}
                  onClick={() =>
                    setExpandedRow(expandedRow === item.id ? null : item.id!)
                  }
                >
                  {item.description}
                </span>
              ),
            },
            {
              label: "PRICE",
              render: (item) =>
                ` ${item.category?.menu?.currency || ""} ${item.price}`,
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
              render: (item) => formatDate(item.created_at!),
            },

            {
              label: "",
              render: (item) => (
                <ItemActions
                  item={item}
                  handleDelete={handleDelete}
                  handleSelectItem={handleSelectItem}
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

export default ItemTable;
