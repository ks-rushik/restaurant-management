"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

const RouterTransition = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nprogress.start();
    const timer = setTimeout(() => nprogress.complete(), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return <NavigationProgress size={2} />;
};

export default RouterTransition;
