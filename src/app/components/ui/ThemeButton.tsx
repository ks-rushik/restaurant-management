import { Switch } from "@mantine/core";
import React, { FC } from "react";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { changeTheme } from "@/app/helper/changeTheme";

type IThemButtonProps = {
  theme: "dark"  | "light";
  toggleTheme: any;
};
const ThemeButton: FC<IThemButtonProps> =({ theme, toggleTheme }) => {
  return (
    <Switch
      size="md"
      color="dark.4"
      onChange={changeTheme}
      checked={theme === "dark"}
      className="mr-1"
      onLabel={
        <IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />
      }
      offLabel={
        <IconMoonStars
          size={16}
          stroke={2.5}
          color="var(--mantine-color-blue-6)"
        />
      }
    />
  );
};

export default ThemeButton;
