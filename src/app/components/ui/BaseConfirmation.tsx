import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

type IBaseConfirmationProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
} & {
  text: string;
  children: ReactNode;
};
const BaseConfirmation: FC<IBaseConfirmationProps> = (props) => {
  const { text, children, classNames } = props;
  const { title, content, header, ...otherElement } = classNames || {};
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirm action"
        size={"md"}
        classNames={{
          header: clsx("bg-white dark:bg-gray-700 dark:text-white ", header),
          content: clsx(
            "rounded-2xl dark:bg-gray-700 dark:text-white ",
            content
          ),
          title: clsx("text-black text-xl font-bold dark:text-white ", title),
          ...otherElement,
        }}
      >
        <div className="flex flex-col">
          {text}
          {children}
        </div>
      </Modal>
      <div onClick={open} title="Delete">
        <RiDeleteBinLine size={22} className="hover:text-red-500 cursor-pointer " />
      </div>
    </>
  );
};
export default BaseConfirmation;
