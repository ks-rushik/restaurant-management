import { FC } from "react";
import { IoSearch } from "react-icons/io5";
import BaseTextField from "@components/ui/BaseInput";

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
      InputWrapperClassNames={{
        root: " xl:w-3/4 lg:w-3/4 md:3/4",
      }}
      classNames={{
        input: "",
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
