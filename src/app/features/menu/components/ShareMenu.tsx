import BaseButton from "@/app/components/ui/BaseButton";
import { CopyButton, Modal, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { IMenudata } from "../types/type";

type IShareMenuProps = {
  item: IMenudata;
};

const ShareMenu: FC<IShareMenuProps> = (props) => {
  const { item } = props;
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareableLink = `http://localhost:3000/public?id=${item.id}
`

  return (
    <>
     <BaseButton onClick={() => setShareModalOpen(true)}>Share Menu</BaseButton>
    <Modal
      opened={shareModalOpen}
      onClose={() => setShareModalOpen(false)}
      title="Share Menu Link"
      centered
    >
      <TextInput value={shareableLink} readOnly />
      <CopyButton value={shareableLink}>
        {({ copied, copy }) => (
          <BaseButton onClick={copy} mt="sm">
            {copied ? "Copied!" : "Copy Link"}
          </BaseButton>
        )}
      </CopyButton>
    </Modal>
    </>
  );
};

export default ShareMenu;
