import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "font-bold",
    "line-through",
    "underline",
    "italic",
    "hover:underline",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsla(var(--background))",
        card: "var(--card)",
        black: "hsla(var(--black))",
        highlight: "hsla(var(--highlight))",
        primary: "hsla(var(--primary))",
        secondary: "hsla(var(--secondary))",
        muted: "hsla(var(--muted))",
        "text-3": "hsla(var(--text-3))",
        nav: "hsla(var(--nav))",
        "button-background": "hsla(var(--button-background))",
        error: "hsla(var(--error))",
        overlay: "hsla(var(--overlay))",
        "footer-background": "hsla(var(--footer-background))",
        "panel-background": "hsla(var(--panel-background))",
        "panel-background-2": "hsla(var(--panel-background-2))",
      },
      fontSize: {
        /* 11.6667px → 14.4px */
        xs: [
          "clamp(0.7292rem, 0.6722rem + 0.2531vw, 0.9rem);",
          "clamp(1.05rem, 0.9313rem + 0.5278vw, 1.4063rem);",
        ],
        /* 14px → 18px */
        sm: [
          "clamp(0.875rem, 0.7917rem + 0.3704vw, 1.125rem);",
          "clamp(1.26rem, 1.0941rem + 0.7375vw, 1.7578rem);",
        ],
        /* 16.8px → 22.5px */
        md: [
          "clamp(1.05rem, 0.9313rem + 0.5278vw, 1.4063rem);",
          "clamp(1.512rem, 1.2836rem + 1.0152vw, 2.1973rem);",
        ],
        /* 20.16px → 28.125px */
        lg: [
          "clamp(1.26rem, 1.0941rem + 0.7375vw, 1.7578rem);",
          "clamp(1.8144rem, 1.5037rem + 1.381vw, 2.7466rem);",
        ],
        /* 24.192px → 35.1563px */
        xl: [
          "clamp(1.512rem, 1.2836rem + 1.0152vw, 2.1973rem);",
          "clamp(2.1773rem, 1.7586rem + 1.8607vw, 3.4332rem);",
        ],
        /* 29.0304px → 43.9453px */
        xxl: [
          "clamp(1.8144rem, 1.5037rem + 1.381vw, 2.7466rem);",
          "clamp(2.5rem, 2.3333rem + 0.7407vw, 3rem);",
        ],
        /* 34.8365px → 54.9316px */
        xxxl: [
          "clamp(2.1773rem, 1.7586rem + 1.8607vw, 3.4332rem);",
          "clamp(2.5rem, 2.3333rem + 0.7407vw, 3rem);",
        ],
      },
      fontFamily: {
        content: "var(--content)",
      },
      fontWeight: {
        light: "300",
        regular: "500",
      },
    },
  },
};
