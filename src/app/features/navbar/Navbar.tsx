"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@mantine/core";
import Image from "next/image";
import website from "./website.svg";
import LogOut from "../auth/components/Logout";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#fff] border-gray-200 mt-2 text-white border-b-2 border-b-gray-150 flex justify-between items-center shadow-lg">
      <div className="flex items-center ">
        <Image src={website} width={100} height={100} alt="Website Logo" />
      </div>

      <div className="relative">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt="User Avatar"
          size={"lg"}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          classNames={{
            root: "transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 xl:mr-1",
          }}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40  text-black shadow-lg bg-blue-50 z-20 rounded-xl">
            <Link
              href="/userprofile"
              className="block px-4 py-2"
              onClick={() => setDropdownOpen(false)}
            >
              Profile Page
            </Link>
            <LogOut />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
