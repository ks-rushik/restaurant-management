import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        backgroundColor: "#F0F0F0",
        bgInput: "#f9eed164",
        Border: "#2a85ff",
        LabelColor: "#737380",
        primary: {
          lighter: "#C8FAD6",
          light: "#5BE49B",
          main: "#00A76F",
          dark: "#007867",
          darker: "#004B50",
        },
        secondary: {
          lighter: "#EFD6FF",
          light: "#C684FF",
          main: "#8E33FF",
          dark: "#5119B7",
          darker: "#27097A",
        },
        info: {
          lighter: "#CAFDF5",
          light: "#61F3F3",
          main: "#00B8D9",
          dark: "#006C9C",
          darker: "#003768",
        },
        success: {
          lighter: "#D3FCD2",
          light: "#77ED8B",
          main: "#22C55E",
          dark: "#118D57",
          darker: "#065E49",
        },
        warning: {
          lighter: "#FFF5CC",
          light: "#FFD666",
          main: "#FFAB00",
          dark: "#B76E00",
          darker: "#7A4100",
        },
        error: {
          lighter: "#FFE9D5",
          light: "#FFAC82",
          main: "#FF5630",
          dark: "#B71D18",
          darker: "#7A0916",
        },
        gray: {
          50: "#FCFDFD",
          100: "#F9FAFB",
          200: "#F4F6F8",
          300: "#DFE3E8",
          400: "#C4CDD5",
          500: "#919EAB",
          600: "#637381",
          700: "#454F5B",
          800: "#1C252E",
          900: "#141A21",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
