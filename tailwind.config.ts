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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          lighter: "var(--color-primary-lighter)",
          light: "var(--color-primary-light)",
          main: "var(--color-primary-main)",
          dark: "var(--color-primary-dark)",
          darker: "var(--color-primary-darker)",
        },
        secondary: {
          lighter: "var(--color-secondary-lighter)",
          light: "var(--color-secondary-light)",
          main: "var(--color-secondary-main)",
          dark: "var(--color-secondary-dark)",
          darker: "var(--color-secondary-darker)",
        },
        success: {
          lighter: "var(--color-sucess-lighter)",
          light: "var(--color-sucess-light)",
          main: "var(--color-sucess-main)",
          dark: "var(--color-sucess-dark)",
          darker: "var(--color-sucess-darker)",
        },
        warning: {
          lighter: "var(--color-warning-lighter)",
          light: "var(--color-warning-light)",
          main: "var(--color-warning-main)",
          dark: "var(--color-warning-dark)",
          darker: "var(--color-warning-darker)",
        },
        error: {
          lighter: "var(--color-error-lighter)",
          light: "var(--color-error-light)",
          main: "var(--color-error-main)",
          dark: "var(--color-error-dark)",
          darker: "var(--color-error-darker)",
        },
        gray: {
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
