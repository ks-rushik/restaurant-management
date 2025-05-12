import { FC } from "react";

import BaseSelect, { IBaseSelectProps } from "@components/ui/BaseSelect";
import { LuFilter } from "react-icons/lu";

type ISearchInputProps = IBaseSelectProps & {
  value: string;
  onChange: (value: string | null) => void;
};
const icon = <LuFilter size={20} />;

const FilteredData: FC<ISearchInputProps> = (props) => {
  const { value, onChange, ...other } = props;

  return (
    <BaseSelect
      leftSectionPointerEvents="none"
      leftSection={icon}
      checkIconPosition="right"
      value={value}
      onChange={onChange}
      classNames={{
        input: "h-10 bg-white  cursor-pointer",
        dropdown: " dark:border-gray-700 dark:bg-gray-700",
      }}
      searchable
      {...other}
    />
  );
};

export default FilteredData;
