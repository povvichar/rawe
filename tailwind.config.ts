import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: "#EDEDED",
        products: "#FFFFFF",
        accent: "#E8A0B4",
        ink: "#1A1A1A",
        mid: "#6B6B6B",
        whisper: "#D4D4D4",
        cream: "#F9F1EE",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
