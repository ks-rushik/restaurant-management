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
  const { title, content, ...otherElement } = classNames || {};
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirm action"
        size={"md"}
        classNames={{
          content: clsx("rounded-2xl  ", content),
          title: clsx("text-black text-xl font-bold", title),
          ...otherElement,
        }}
      >
        <div className="flex flex-col">
          {text}
          {children}
        </div>
      </Modal>
      <div onClick={open} title="Delete">
        <RiDeleteBinLine size={22} className="hover:text-red-500 "/>
      </div>
    </>
  );
};
export default BaseConfirmation;
