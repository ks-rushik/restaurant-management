"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

const RouterTransition = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(true); 

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    nprogress.start(); 
    setTimeout(() => nprogress.complete(), 500);

    return () => {
      nprogress.start();
    };
  }, [pathname, searchParams]);

  return <NavigationProgress size={2} />;
};

export default RouterTransition;
