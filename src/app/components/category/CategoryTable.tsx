import Image from "next/image";
import { FC } from "react";

import SearchFilter from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { LuFilter } from "react-icons/lu";

import { IMessages } from "@/app/[locale]/messages";
import updateOrder from "@/app/actions/order/update-order";
import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity } from "@/app/constants/common";
import formatDate from "@/app/utils/formatdate";
import { useDictionary } from "@components/context/Dictionary";


import BaseSelect from "../ui/BaseSelect";
import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";

type ICategoryTableProps = {
  data: ICategorydata[] | undefined | null;
  handleSelectCategory: (item: ICategorydata) => void;
  handleView: (id: string) => void;
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
  pagination: {
    fetchNextPage: (
      options?: FetchNextPageOptions,
    ) => Promise<
      InfiniteQueryObserverResult<InfiniteData<ICategorydata[], unknown>, Error>
    >;
    hasNextPage: boolean;
  };};

const CategoryTable: FC<ICategoryTableProps> = (props) => {
  const {
    data,
    handleView,
    handleSelectCategory,
    handleDelete,
    pagination,
    loading,
    opened,
    close,
    searchData,
    setSearchData,
    filterStatus,
    setFilterStatus,
  } = props;
  const lang = useDictionary();
  const handledrag = async (state: ICategorydata[]) => {
    const isNotChange = state.every((item, index) => item.position === index);
    if (isNotChange) return;
    await updateOrder(state, "category");
  };

  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilter>
        <SearchInput
          placeholder={lang?.categories.searchcategory}
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <BaseSelect
          value={filterStatus}
          leftSection={<LuFilter size={20} />}
          data={[Availablity.Available, Availablity.NotAvailable, "All"]}
          placeholder={lang?.categories.chooseavailibility}
          onChange={(value) => setFilterStatus(value || "")}
        />
      </SearchFilter>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Category found.</p>
      ) : (
        <BaseTable
          pagination={pagination}
          data={data}
          classNames={{
            th: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
            td: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
          }}
          getKey={(item) => item.id!}
          DragOn={handledrag}
          drag
          columns={[
            {
              label: lang?.categories.IMAGE!,
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
              label: lang?.categories.CATEGORYNAME!,
              render: (item) => item.category_name,
            },
            {
              label: lang?.categories.AVAILABILITY!,
              render: (item) =>
                item.status === Availablity.NotAvailable ? (
                  <p className="text-red-500">
                    {lang?.availableStatus.notAvailable}
                  </p>
                ) : (
                  <p className="text-green-600">
                    {lang?.availableStatus.available}
                  </p>
                ),
            },
            {
              label: lang?.categories.CREATEDAT!,
              render: (item) => formatDate(item.create_at!),
            },
            {
              label: lang?.categories.UPDATEDAT!,
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
