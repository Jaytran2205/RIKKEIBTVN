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
        forest: {
          50: "#eaf5f1",
          100: "#cde7dc",
          200: "#9dcbb9",
          500: "#2d7a64",
          700: "#1B4D3E", // Gam màu chủ đạo yêu cầu
          800: "#143c30",
          900: "#0e2921",
        },
        coral: {
          400: "#FF8C70",
          500: "#FF6B4A", // Điểm nhấn cam san hô
          600: "#E85433",
        },
        milk: "#F8F9FA",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)", // Chuẩn chuyển động Apple/iOS cực mượt
      },
      backdropBlur: {
        glass: "16px",
      },
      boxShadow: {
        glass: "0 16px 40px -8px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.25)",
        "glass-sm": "0 8px 24px -4px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
