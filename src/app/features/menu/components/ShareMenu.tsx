"use client";
import BaseButton from "@/app/components/ui/BaseButton";
import { CopyButton, Modal, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { IMenudata } from "../types/type";
import fetchshortUrl from "../../public/actions/getUrl";
import shortLink from "../../public/actions/addshortlink-action";
import BaseButtonLoader from "@/app/components/ui/BaseButtonLoader";

type IShareMenuProps = {
  item: IMenudata;
};

const ShareMenu: FC<IShareMenuProps> = (props) => {
  const [shortCode, setShortCode] = useState();
  const [loading, setLoading] = useState(false);
  const { item } = props;
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleShareMenu = async () => {
    setLoading(true);
    await shortLink(item.id);
    const data = await fetchshortUrl(item.id);
    const shortcode = data.short_url;
    setShortCode(shortcode);
    setLoading(false);
    setShareModalOpen(true);
  };
  const shareableLink = `http://localhost:3000/m/${shortCode}`;

  return (
    <>
      <BaseButton
        onClick={() => handleShareMenu()}
        classNames={{ inner: "text-white", root: "min-w-32" }}
      >
        {loading ? <BaseButtonLoader /> : "Share Menu"}
      </BaseButton>
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
