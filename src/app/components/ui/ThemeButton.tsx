"use client";

import React from "react";

type ThemeButtonProps = {
  theme: "dark" | "light";
  onChange: () => void;
};

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, onChange }) => {
  return (
    <div className="sticky top-0 z-10">
      <label className="relative w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-800 shadow-[4px_4px_0px_0px_#333] bg-white active:shadow-none active:translate-x-[3px] active:translate-y-[3px]">
        <input
          type="checkbox"
          className="absolute w-full h-full opacity-0 cursor-pointer z-10 "
          checked={theme === "dark"}
          onChange={onChange}
        />
        <svg
          className={`absolute w-4 h-4 fill-gray-800 transition-opacity  ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
          viewBox="0 0 24 24"
        >
          <path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8zm2.8 12.5c.5 0 1 0 1.4-.1-1.2 1.1-2.8 1.7-4.5 1.7-3.9 0-7-3.1-7-7 0-2.5 1.4-4.8 3.5-6-.7 1.1-1 2.4-1 3.8-.1 4.2 3.4 7.6 7.6 7.6z" />
        </svg>

        <svg
          className={`absolute w-4 h-4 stroke-gray-800 transition-opacity ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        >
          <circle r={5} cy={12} cx={12} />
          <line y2={3} y1={1} x2={12} x1={12} />
          <line y2={23} y1={21} x2={12} x1={12} />
          <line y2="5.64" y1="4.22" x2="5.64" x1="4.22" />
          <line y2="19.78" y1="18.36" x2="19.78" x1="18.36" />
          <line y2={12} y1={12} x2={3} x1={1} />
          <line y2={12} y1={12} x2={23} x1={21} />
          <line y2="18.36" y1="19.78" x2="5.64" x1="4.22" />
          <line y2="4.22" y1="5.64" x2="19.78" x1="18.36" />
        </svg>
      </label>
    </div>
  );
};

export default ThemeButton;
