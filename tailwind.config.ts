import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zuraio: {
          white: "#FFFFFF",
          sidebar: "#F8F8F8",
          accent: "#9FAF52",
          text: "#333333",
          textMuted: "#777777",
          loginBg: "#DCE6B5",
          loginAccent: "#A3BB66",
          loginBorder: "#e1dfdd",
          loginError: "#d13438",
          sidebarHeader: "#9FAF52",
          sidebarHover: "#DCE6B5",
          border: "#e1dfdd",
          destructive: "#d13438",
        },
      },
    },
  },
  plugins: [],
};

export default config;
