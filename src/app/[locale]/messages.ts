import "server-only";

import en from "./messages/en.json";

export type IMessages = typeof en;

const messages = {
  en: () => import("./messages/en.json").then((module) => module.default),
  hd: () => import("./messages/hd.json").then((module) => module.default),
  sp: () => import("./messages/sp.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: string // allow any string input
) => {
  const loader = messages[locale as keyof typeof messages] || messages["en"];
  return await loader();
};
