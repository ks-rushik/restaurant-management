import { FC } from "react";

import BaseTextField from "@components/ui/BaseInput";
import { IoSearch } from "react-icons/io5";

type ISearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SearchInput: FC<ISearchInputProps> = (props) => {
  const { value, onChange, placeholder } = props;
  return (
    <BaseTextField
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
      classNames={{
        input: "w-full",
      }}
      leftSection={
        <IoSearch
          size={20}
          className="hover:text-gray-700 dark:hover:text-gray-400 "
        />
      }
    />
  );
};

export default SearchInput;
