"use client";

import Link from "next/link";
import { Avatar, Menu } from "@mantine/core";
import Image from "next/image";
import logo3 from "../../images/logo3.png";
import LogOut from "../auth/Logout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ThemeButton from "../ui/ThemeButton";
import { changeTheme } from "@/app/helper/changeTheme";
import BaseModal from "../ui/BaseModal";
import BaseTextField from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";

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
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setLoading(false);
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
        <BaseModal
          opened={modalopened}
          size={"md"}
          onClose={() => setModalOpened(false)}
          title="Change Password"
        >
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 max-w-sm">
            <BaseTextField
              type="password"
              value={password}
              label="New Password"
              labelvalue
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              required
            
            />
            <BaseButton
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              {loading ? "Updating..." : "Change Password"}
            </BaseButton>
            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
        </BaseModal>
      </div>
    </nav>
  );
};

export default Navbar;
