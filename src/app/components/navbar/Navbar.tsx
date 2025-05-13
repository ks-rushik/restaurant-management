"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import ChangePassword from "@components/auth/ChangePassword";
import LogOut from "@components/auth/Logout";
import ThemeButton from "@components/ui/ThemeButton";
import { Avatar, Menu } from "@mantine/core";
import Cookies from "js-cookie";

import { IMessages } from "@/app/[locale]/messages";
import { useThemeToggle } from "@/app/hook/useThemetoggle";
import logo3 from "@/app/images/logo3.png";

import BaseSelect from "../ui/BaseSelect";

export type INavbarProps = {
  lang: IMessages;
};

const Navbar: FC<INavbarProps> = (props) => {
  const { lang } = props;
  const [opened, setOpened] = useState(false);
  const [modalopened, setModalOpened] = useState(false);
  const { theme, toggleTheme, mounted } = useThemeToggle();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const pathname = usePathname();
  const router = useRouter();

  const localeList = ["en", "hd", "sp"];
  const labelList = ["English", "Hindi", "Spanish"];

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
    <nav className="bg-white dark:bg-black/90 shadow-lg sticky top-0 z-20 py-2 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src={logo3}
          width={100}
          height={100}
          alt="Website Logo"
          className="dark:bg-black"
        />
      </div>

      <div className="flex flex-row items-center gap-4">
        <BaseSelect
          data={["English", "Hindi", "Spanish"]}
          defaultValue="English"
          value={selectedLanguage}
          size="small"
          classNames={{ root: "w-28" }}
          onChange={(value) => handleLanguageChange(value)}
        />

        {mounted && <ThemeButton theme={theme!} onChange={toggleTheme} />}

        <Menu
          opened={opened}
          onChange={setOpened}
          zIndex={0}
          classNames={{ item: "font-[650] z-10 bg-white" }}
        >
          <Menu.Target>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              alt="User Avatar"
              size="lg"
              classNames={{
                root: "transition cursor-pointer delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 xl:mr-1",
              }}
            />
          </Menu.Target>

          <Menu.Dropdown
            style={{ zIndex: 20 }}
            className="dark:bg-[#131414] dark:border-black"
            classNames={{ dropdown: "dark:!bg-gray-800" }}
          >
            <Menu.Item
              classNames={{
                item: "text-black dark:bg-gray-800 dark:text-white",
              }}
            >
              <Link href="/userprofile" className="block px-3 py-1">
                {lang.navbar.profilepage}
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => setModalOpened(true)}
              classNames={{ item: "dark:bg-gray-800 dark:text-white" }}
            >
              {lang.navbar.changepassword}
            </Menu.Item>
            <Menu.Item component={() => <LogOut lang={lang} />}>
              {lang.navbar.logout}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <ChangePassword
          modalopened={modalopened}
          setModalOpened={setModalOpened}
          lang={lang}
        />
      </div>
    </nav>
  );
};

export default Navbar;
