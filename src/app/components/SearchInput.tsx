import { TextInput } from "@mantine/core";
import { FC } from "react";
import { IoSearch } from "react-icons/io5";

type ISearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SearchInput: FC<ISearchInputProps> = (props) => {
  const { value, onChange, placeholder } = props;
  return (
    <TextInput
      type="text"
      placeholder={placeholder || "Search..."}
      variant={"unstyled"}
      value={value}
      onChange={onChange}
      classNames={{
        input: "h-10 dark:bg-gray-700 bg-white cursor-pointer",
        root: "border border-gray-200 xl:w-3/4 lg:w-3/4 md:3/4 dark:bg-gray-700 dark:border-gray-700 ",
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
