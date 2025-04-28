import { FC } from "react";
import { LuFilter } from "react-icons/lu";
import BaseSelect from "./ui/BaseSelect";

type ISearchInputProps = {
  value: string;
  onChange: (value: string | null) => void;
  defaultValue?: string
};
const icon = <LuFilter size={20} />;

const FilteredData: FC<ISearchInputProps> = (props) => {
  const { value, onChange ,defaultValue } = props;
  
  return (
    <BaseSelect
      leftSectionPointerEvents="none"
      leftSection={icon}
      checkIconPosition="right"
      value={value}
      onChange={onChange}
      data={["Available", "Not Available", "All"]}
      defaultValue={defaultValue}
      classNames={{
        input: "h-10 bg-white  cursor-pointer",
        root: "sm:w-full mt-2 md:mt-0 xl:mt-0 lg:mt-0 md:w-[24%] xl:w-[24%] lg:w-[24%]",
        dropdown: " dark:border-gray-700 dark:bg-gray-700",
      }}
      searchable
    />
  );
};

export default FilteredData;
