import React, { FC, useState } from "react";

import FilteredData from "@components/FilterData";
import { useDictionary } from "@components/context/Dictionary";
import BaseButton from "@components/ui/BaseButton";

import { Availablity } from "@/app/constants/common";

export type IModalFilterProps = {
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  close: () => void;
};

const ModalFilter: FC<IModalFilterProps> = (props) => {
  const { filterStatus, setFilterStatus, close } = props;
  const lang = useDictionary();
  const [modalFilters, setModalFilters] = useState<string | null>(filterStatus);

  const handleFilter = () => {
    setFilterStatus(modalFilters!);
    close();
  };

  const handleClear = () => {
    setModalFilters("");
    setFilterStatus("");
    close();
  };

  return (
    <div className="gap-8 flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col ">
          <p className="text-gray-700">{lang.categories.status}</p>
          <FilteredData
            value={modalFilters!}
            data={[Availablity.Available, Availablity.NotAvailable, "All"]}
            defaultValue={"All"}
            placeholder={lang?.categories.chooseavailibility}
            onChange={(value) => setModalFilters(value)}
          />
        </div>
      </div>
      <div className="flex  flex-row gap-4">
        <BaseButton
          onClick={handleClear}
          classNames={{ root: "h-12 w-full" }}
          intent={"primary"}
          outline
        >
          {lang.items.cancel}
        </BaseButton>
        <BaseButton onClick={handleFilter} classNames={{ root: "h-12 w-full" }}>
          {lang.items.filters}
        </BaseButton>
      </div>
    </div>
  );
};

export default ModalFilter;
