import { Modal, ModalProps, ModalStylesNames } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import BaseButton from "./BaseButton";

type IBaseConfirmationProps = ModalProps & {
  classNames?: Partial<Record<ModalStylesNames, string>> | undefined;
} & {
  text: string;
  children: ReactNode;
  confirmationbutton: string;
};
const BaseConfirmation: FC<IBaseConfirmationProps> = (props) => {
  const { text, children, confirmationbutton, classNames } = props;
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
      <BaseButton
        onClick={open}
        className="h-12 w-1/4"
        classNames={{ inner: "font-sm text-white" }}
      >
        {confirmationbutton}
      </BaseButton>
    </>
  );
};
export default BaseConfirmation;
