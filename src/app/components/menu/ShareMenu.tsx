"use client";
import BaseButton from "@/app/components/ui/BaseButton";
import { CopyButton, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import Image from "next/image";
import BaseModal from "@/app/components/ui/BaseModal";
import { RiDownload2Line } from "react-icons/ri";
import { FaPaste } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import { IMenudata } from "@/app/type/type";
import shortLink from "@/app/actions/customer/addshortlink-action";
import fetchshortUrl from "@/app/actions/customer/getUrl";
import generateQRCode from "@/app/helper/qrcodegenrating";
import { notifications } from "@mantine/notifications";
import fetchCategorydata from "@/app/actions/category/category-fetch";

type IShareMenuProps = {
  item: IMenudata;
};

const ShareMenu: FC<IShareMenuProps> = (props) => {
  const [shortCode, setShortCode] = useState();
  const [qrcode, setQrcode] = useState<string | undefined>();
  const { item } = props;
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleShareMenu = async () => {
    const categorydata = await fetchCategorydata(item.id)
    if(categorydata.length === 0 ){
      notifications.show({message: 'To preview menu add atleast one category' })
    }
    else{
      await shortLink(item.id);
      const data = await fetchshortUrl(item.id);
      const shortcode = data.short_url;
      setShortCode(shortcode);
      const qrcode = await generateQRCode(shortCode!);
      setQrcode(qrcode);
      setShareModalOpen(true);
    }
  };
  const handleInActiveMenu = () => {
    notifications.show({
      message: `${item.menu_name} is not active to share this menu active the status`,
    });
  };

  const shareableLink = `http://localhost:3000/m/${shortCode}`;

  return (
    <>
      <button
        onClick={() => {
          if (item.status !== "Not Available") {
            handleShareMenu();
            console.log("sfs");
          } else {
            handleInActiveMenu();
          }
        }}
        title="Share Menu"
      >
        <RiShareLine size={22} className="mr-6 hover:text-blue-500" />
      </button>

      <BaseModal
        opened={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share Menu Link"
        centered
      >
        {qrcode && (
          <div className="flex justify-center ">
            <Image src={qrcode} alt="qrcode" width={200} height={150}></Image>
          </div>
        )}
        <div className="mx-4 sm:mx-20 flex flex-col sm:flex-row justify-between pt-2 gap-2 sm:gap-4">
          <CopyButton value={qrcode!} timeout={2000}>
            {({ copied, copy }) => (
              <BaseButton
                color={copied ? "teal" : "gray"}
                variant="subtle"
                classNames={{ root: "h-10 w-full sm:w-auto text-white" }}
                onClick={copy}
              >
                {copied ? (
                  <div className="inline-flex items-center">
                    <span className="mr-2 text-white">Copied</span>
                    <FaPaste />
                  </div>
                ) : (
                  <div className="inline-flex items-center">
                    <span className="mr-2 text-white">Copy</span>
                    <FaCopy />
                  </div>
                )}
              </BaseButton>
            )}
          </CopyButton>

          <a href={qrcode} download="qrcode.png">
            <BaseButton
              classNames={{ root: "h-10 w-full sm:w-auto text-white" }}
            >
              <span className="mr-2 text-white">Download</span>
              <RiDownload2Line />
            </BaseButton>
          </a>
        </div>

        <TextInput
          value={shareableLink}
          readOnly
          classNames={{
            root: "pt-8",
            input:
              "border-gray-300 h-10 text-pretty font-serif text-base  bg-gray-200 rounded-md hover:border-2 hover:border-blue-400 pr-10",
          }}
          rightSection={
            <CopyButton value={shareableLink} timeout={2000}>
              {({ copied, copy }) => (
                <span
                  onClick={copy}
                  className="h-10 w-10 flex items-center justify-center rounded-r-md bg-blue-500 text-white cursor-pointer"
                >
                  {copied ? <FaPaste /> : <FaCopy />}
                </span>
              )}
            </CopyButton>
          }
        />
      </BaseModal>
    </>
  );
};

export default ShareMenu;
