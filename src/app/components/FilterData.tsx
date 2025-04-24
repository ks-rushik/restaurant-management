import { Select } from "@mantine/core";
import { FC } from "react";
import { LuFilter } from "react-icons/lu";

type ISearchInputProps = {
  value: string;
  onChange: (value: string | null) => void;
};
const icon = <LuFilter size={20} />;

const FilteredData: FC<ISearchInputProps> = (props) => {
  const { value, onChange } = props;
  return (
    <Select
      leftSectionPointerEvents="none"
      leftSection={icon}
      checkIconPosition="right"
      variant="unstyled"
      value={value}
      onChange={onChange}
      data={["Available", "Not Available", "All"]}
      classNames={{ input: "h-10 dark:bg-gray-700 bg-white dark:text-white" , root:"sm:w-full mt-2 md:mt-0 xl:mt-0 lg:mt-0 md:w-[24%] xl:w-[24%] lg:w-[24%] border border-gray-200 dark:bg-gray-700 dark:border-gray-700" ,dropdown:"dark:text-blue-400 dark:border-gray-700 dark:bg-gray-700"}}
      searchable
    />
  );
};

export default FilteredData;
