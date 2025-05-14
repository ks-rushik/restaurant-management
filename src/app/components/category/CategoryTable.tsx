import Image from "next/image";
import { FC } from "react";

import FilteredData from "@components/FilterData";
import SearchFilterWrapper from "@components/SearchFilter";
import SearchInput from "@components/SearchInput";
import { useDictionary } from "@components/context/Dictionary";
import { CiFilter } from "react-icons/ci";
import { FaDownLong, FaUpLong } from "react-icons/fa6";

import Loader from "@/app/components/ui/BaseLoader";
import BaseTable from "@/app/components/ui/BaseTable";
import { Availablity } from "@/app/constants/common";
import formatDate from "@/app/utils/formatdate";

import BaseButton from "../ui/BaseButton";
import BaseModal from "../ui/BaseModal";
import { ICategorydata } from "./AddCategoryModal";
import CategoryActions from "./CategoryActions";
import ModalFilter from "./ModalFilter";
import { useDisclosure } from "@mantine/hooks";

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
    opened: ModalOpened,
    close: ModalClose,
    searchData,
    setSearchData,
    filterStatus,
    setFilterStatus,
  } = props;
  const lang = useDictionary();
  const [opened, { open, close }] = useDisclosure(false);

  return !data ? (
    <Loader />
  ) : (
    <>
      <SearchFilterWrapper>
        <SearchInput
          placeholder={lang?.categories.searchcategory}
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <div className="hidden sm:flex flex-row gap-4">
          <FilteredData
            value={filterStatus}
            data={[Availablity.Available, Availablity.NotAvailable, "All"]}
            placeholder={lang?.items.chooseavailibility}
            onChange={(value) => setFilterStatus(value || "")}
          />
        </div>
        <BaseModal opened={opened} onClose={close} title={"Filter data"}>
          <ModalFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            close={close}
          />
        </BaseModal>

        <BaseButton
          className="sm:hidden  px-4  h-[54px] font-normal text-lg w-36 rounded-lg"
          leftSection={<CiFilter size={24} />}
          onClick={() => {
            open();
          }}
        >
          {lang.items.filters}
        </BaseButton>
      </SearchFilterWrapper>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No Category found.</p>
      ) : (
        <BaseTable
          data={data}
          classNames={{
            th: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
            td: "[&:first-child]:!min-w-[70px] [&:first-child]:!w-[70px]",
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
                  opened={ModalOpened}
                  close={ModalClose}
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
