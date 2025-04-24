"use client";

import Link from "next/link";
import { Avatar, Menu } from "@mantine/core";
import Image from "next/image";
import logo2 from "../../images/logo2.png";
import LogOut from "../auth/Logout";
import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";
import ThemeButton from "../ui/ThemeButton";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); 
  const [opened, setOpened] = useState(false);


  return (
    <nav className={`bg-white dark:bg-neutral-950 shadow-lg py-2 px-4 flex justify-between items-center`}>
      <div className="flex items-center">
        <Image src={logo2} width={100} height={100} alt="Website Logo" className="dark:bg-black" />

      </div>
      <div className="flex flex-row items-center">
      <ThemeButton theme={theme} toggleTheme={toggleTheme} />

      <Menu
        opened={opened}
        onChange={setOpened}
        zIndex={0}
        classNames={{ item: "font-[650] z-10 bg-white"  }}
      >
        <Menu.Target>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="User Avatar"
            size={"lg"}
            classNames={{
              root: "transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 xl:mr-1",
            }}
          />
        </Menu.Target>

        <Menu.Dropdown style={{zIndex:20}} className="dark:bg-black dark:border-black">
          <Menu.Item classNames={{ item: " text-black dark:bg-gray-700 dark:text-white " }}>
            <Link href="/userprofile" className="block px-3 py-1">
              Profile Page
            </Link>
          </Menu.Item>
          <Menu.Item component={LogOut}>LogOut</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;