"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Menu } from "@mantine/core";
import Image from "next/image";
import website from "./website.svg";
import LogOut from "../../components/auth/components/Logout";

const Navbar = () => {
  const [opened, setOpened] = useState(false);

  return (
    <nav className="bg-[#fff] border-gray-200 pt-2 pb-2 px-2 text-white sm:px-4 lg:px-6 md:px-6 border-b-2  border-b-gray-150 flex justify-between items-center shadow-lg">
      <div className="flex items-center ">
        <Image src={website} width={100} height={100} alt="Website Logo" />
      </div>
      <Menu
        opened={opened}
        onChange={setOpened}
        zIndex={0}
        classNames={{ item: "font-[650] z-10 " }}
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

        <Menu.Dropdown style={{zIndex:20}}>
          <Menu.Item classNames={{ item: "hover:bg-gray-200 " }}>
            <Link href="/userprofile" className="block px-4 py-2">
              Profile Page
            </Link>
          </Menu.Item>
          <Menu.Item component={LogOut}>LogOut</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
};

export default Navbar;
