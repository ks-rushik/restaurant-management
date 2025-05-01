import { useEffect, useState } from "react";

import { changeTheme } from "../helper/changeTheme";

export const useThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = async () => {
    await changeTheme();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, mounted };
};
