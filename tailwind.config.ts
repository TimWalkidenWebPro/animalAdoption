import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        basecolor: "var(--basecolor)",
        foregroundLightText: "var(--foreground-light-text)",
        foregroundLight: "var(--foreground-light)",
        animalCardInfo: "var(--animal-card-info)",
      },
    },
  },
  plugins: [],
} satisfies Config;
