import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: {
          950: "#0a0c10",
          900: "#0f1218",
          800: "#161a22",
          700: "#1f242e",
          600: "#2b323e",
        },
        accent: {
          DEFAULT: "#38bdf8",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        gold: "#c9a227",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-h1": ["clamp(2.25rem, 1.4rem + 4vw, 4.25rem)", { lineHeight: "1.05" }],
        "fluid-h2": ["clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)", { lineHeight: "1.1" }],
        "fluid-lead": ["clamp(1rem, 0.95rem + 0.5vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(56,189,248,0.25), 0 20px 60px -15px rgba(56,189,248,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
