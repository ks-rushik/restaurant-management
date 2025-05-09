"use client";

import Link from "next/link";
import { Avatar, Menu } from "@mantine/core";
import Image from "next/legacy/image";
import logo3 from "../../images/logo3.png";
import LogOut from "../auth/Logout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ThemeButton from "../ui/ThemeButton";
import { changeTheme } from "@/app/helper/changeTheme";
import BaseModal from "../ui/BaseModal";
import BaseTextField from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";
import ChangePassword from "../auth/ChangePassword";

const Navbar = () => {
  const [theme, setTheme] = useState<"dark" | "light">();
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [modalopened, setModalOpened] = useState(false);

  useEffect(() => {
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const handleThemeChange = async () => {
    await changeTheme();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <div>
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
          {mounted && theme && (
            <ThemeButton theme={theme} onChange={handleThemeChange} />
          )}

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
                size={"lg"}
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
                  Profile Page
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={() => setModalOpened(true)}
                classNames={{ item: "dark:bg-gray-800 dark:text-white" }}
              >
                Change Password
              </Menu.Item>
              <Menu.Item component={LogOut}>LogOut</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ChangePassword
            modalopened={modalopened}
            setModalOpened={setModalOpened}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
