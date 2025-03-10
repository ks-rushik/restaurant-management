import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import BaseButton from "./BaseButton";
import { RiDeleteBinLine } from "react-icons/ri";

type IBaseConfirmationProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
} & {
  text: string;
  children: ReactNode;
  intent?:
    | "primary"
    | "warning"
    | "danger"
    | "inverse"
    | "success"
    | "purple"
    | "default"
    | null
    | undefined;
};
const BaseConfirmation: FC<IBaseConfirmationProps> = (props) => {
  const { text, children, classNames, intent = "primary" } = props;
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
          title: clsx("text-[#171717] text-xl font-bold", title),
          ...otherElement,
        }}
      >
        <div className="flex flex-col">
          {text}
          {children}
        </div>
      </Modal>
      <div onClick={open}>
        <RiDeleteBinLine size={28} color="red" />
      </div>
    </>
  );
};
export default BaseConfirmation;
