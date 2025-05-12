import "server-only";

export type IMessages = {
    menus: {
      title: string;
      button: string;
      modaltitle: string;
      menuname: string;
      currency: string;
      status: string;
      submitbutton: string;
      MENUNAME: string;
      AVAILABILITY: string;
      CREATEDAT: string;
      UPDATEDAT: string;
    };
    categories: {
      title: string;
      button: string;
      modaltitle: string;
      categoryname: string;
      status: string;
      submitbutton: string;
      IMAGE: string;
      uploadimage: string;
      CATEGORYNAME: string;
      AVAILABILITY: string;
      CREATEDAT: string;
      UPDATEDAT: string;
    };
    items: {
      title: string;
      button: string;
      description: string;
      price: string;
      modaltitle: string;
      jainoption: string;
      uploadimage: string;
      itemname: string;
      status: string;
      submitbutton: string;
      ITEMNAME: string;
      AVAILABILITY: string;
      CREATEDAT: string;
      UPDATEDAT: string;
      IMAGE: string;
      DESCRIPTION: string;
      PRICE: string;
    };
  };
  
const messages = {
  en: () => import("./messages/en.json").then((module) => module.default),
  hd: () => import("./messages/hd.json").then((module) => module.default),
  sp: () => import("./messages/sp.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "hd" | "sp") =>
  messages[locale]();
