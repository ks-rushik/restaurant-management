"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import BaseSelect from "../ui/BaseSelect";

const localeList = ["en", "hd", "sp"];
const labelList = ["English", "Hindi", "Spanish"];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentLocale = pathname.split("/")[1];
    const index = localeList.indexOf(currentLocale);
    setSelectedLanguage(index !== -1 ? labelList[index] : "English");
  }, [pathname]);

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;

    const index = labelList.indexOf(value);
    const newLocale = localeList[index];
    setSelectedLanguage(value);

    Cookies.set("preferred_locale", newLocale, { expires: 365 });

    const segments = pathname.split("/").filter(Boolean);
    if (localeList.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    router.push("/" + segments.join("/"));
  };

  return (
    <BaseSelect
      data={["English", "Hindi", "Spanish"]}
      defaultValue="English"
      value={selectedLanguage}
      size="small"
      classNames={{ root: "w-28" }}
      onChange={(value) => handleLanguageChange(value)}
    />
  );
}
