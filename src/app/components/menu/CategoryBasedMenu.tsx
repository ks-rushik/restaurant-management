"use client";

import Image from "next/image";
import React, { FC, useState } from "react";

import BaseButton from "@components/ui/BaseButton";
import BaseModal from "@components/ui/BaseModal";
import { CopyButton, Loader, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaCopy, FaPaste } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";

import shortLink from "@/app/actions/customer/addshortlink-action";
import { getProfileData } from "@/app/actions/customer/getProfileData";
import fetchshortUrl from "@/app/actions/customer/getUrl";
import { Availablity } from "@/app/constants/common";
import { downloadQRCodeWithText } from "@/app/helper/downloadQRCode";
import getCategorydata from "@/app/helper/getCategorydata";
import generateQRCode from "@/app/helper/qrcodegenrating";

import { IShareMenuProps } from "./ItemBasedMenu";

const CategoryBasedMenu: FC<IShareMenuProps> = (props) => {
  const [shortCode, setShortCode] = useState();
  const [profilename, setProfilename] = useState("");

  const [qrcode, setQrcode] = useState<string | undefined>();
  const { item, lang } = props;
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShareMenu = async () => {
    setLoading(true);
    const categorydata = await getCategorydata(item.id);
    const profiledata = await getProfileData();
    setProfilename(profiledata.name);

    if (categorydata.length === 0) {
      notifications.show({
        message: "To preview menu add atleast one category",
      });
    } else {
      const fetchdata = await Promise.all([
        shortLink(item.id),
        fetchshortUrl(item.id),
        generateQRCode(shortCode!),
      ]);
      fetchdata?.[0];

      const shortUrlData = fetchdata?.[1];
      const shortcode = shortUrlData.short_url;
      setShortCode(shortcode);
      const qrcode = fetchdata?.[2];
      setQrcode(qrcode);
      setShareModalOpen(true);
      setLoading(false);
    }
  };
  const handleInActiveMenu = () => {
    notifications.show({
      message: `${item.menu_name} is not active to share this menu active the status`,
      color: "indigo",
    });
  };

  const shareableLink = `http://localhost:3000/k/${shortCode}`;

  return (
    <>
      <BaseButton
        onClick={() => {
          if (item.status !== Availablity.NotAvailable) {
            handleShareMenu();
          } else {
            handleInActiveMenu();
          }
        }}
        classNames={{ root: "w-full h-12 text-base" }}
        title="Share Menu"
      >
        {loading ? (
          <Loader size={"sm"} color="white" />
        ) : (
          lang?.sharemenu.categorybasedmenu
        )}
      </BaseButton>

      <BaseModal
        opened={shareModalOpen}
        classNames={{ content: "h-[424px]" }}
        overlayProps={{
          opacity: 0.2,
        }}
        onClose={() => setShareModalOpen(false)}
        title={lang?.sharemenu.innertitle}
        centered
      >
        {qrcode && (
          <div className="flex justify-center ">
            <Image
              src={qrcode}
              alt="qrcode"
              width={200}
              height={150}
              className="border-2  rounded-lg"
            ></Image>
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
                    <span className="mr-2 text-white">
                      {lang?.sharemenu.copy}
                    </span>
                    <FaCopy />
                  </div>
                )}
              </BaseButton>
            )}
          </CopyButton>

          <BaseButton
            onClick={() =>
              shortCode && downloadQRCodeWithText(shortCode, profilename)
            }
            classNames={{ root: "h-10 w-full sm:w-auto text-white" }}
          >
            <span className="mr-2 text-white">{lang?.sharemenu.download}</span>
            <RiDownload2Line />
          </BaseButton>
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

export default CategoryBasedMenu;
