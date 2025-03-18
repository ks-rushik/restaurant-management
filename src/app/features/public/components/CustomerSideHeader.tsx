'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../userprofile/actions/userprofile-fetch";
import { fetchMenus } from "../../item/actions/sample-action";
import Image from "next/image";

const CustomerSideHeader = () => {
  const { menuId } = useParams();

  const [profiledata, setProfileData] = useState<{
    name: string;
    logo: string;
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setProfileData(profile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [menuId]);
  return (
    <div className="flex flex-col items-center p-6 pb-12">
      {profiledata ? (
        <div className="  p-6 flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src={profiledata.logo}
              alt="logo"
              width={100}
              height={100}
              className="rounded-full border-4 border-gray-300 shadow-md"
            />
          </div>
          <h1 className="text-xl sm:text-4xl font-bold text-gray-800 text-center">
            {profiledata.name}
          </h1>
        </div>
      ) : (
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      )}
    </div>
  );
};

export default CustomerSideHeader;
