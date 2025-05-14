import React, { FC, useState } from "react";

import FilteredData from "@components/FilterData";
import { useDictionary } from "@components/context/Dictionary";
import BaseButton from "@components/ui/BaseButton";

import { Availablity, Jainoption } from "@/app/constants/common";

import { IFilter } from "./ItemPage";

export type IModalFilterProps = {
  filters: IFilter;
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
  close: () => void;
};

const ModalFilter: FC<IModalFilterProps> = (props) => {
  const { filters, setFilters, close } = props;
  const lang = useDictionary();
  const [modalFilters, setModalFilters] = useState({
    avaibilityStatus: filters.avaibilityStatus,
    jainOption: filters.jainOption,
  });

  const handleFilter = () => {
    setFilters(modalFilters);
    close();
  };

  const handleClear = () => {
    const clearedFilters = { avaibilityStatus: "", jainOption: "" };
    setModalFilters(clearedFilters);
    setFilters(clearedFilters);
    close();
  };

  return (
    <div className="gap-8 flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col ">
          <p className="text-gray-700">{lang.items.status}</p>
          <FilteredData
            value={modalFilters.avaibilityStatus}
            data={[Availablity.Available, Availablity.NotAvailable, "All"]}
            defaultValue={"All"}
            placeholder={lang?.items.chooseavailibility}
            onChange={(value) =>
              setModalFilters((prev) => ({
                ...prev,
                avaibilityStatus: value || "",
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700">{lang.items.jainoption}</p>
          <FilteredData
            value={modalFilters.jainOption}
            data={[Jainoption.Jain, Jainoption.NotJain, "All"]}
            placeholder={lang?.items.choosejainoption}
            defaultValue={"All"}
            onChange={(value) =>
              setModalFilters((prev) => ({
                ...prev,
                jainOption: value || "",
              }))
            }
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
