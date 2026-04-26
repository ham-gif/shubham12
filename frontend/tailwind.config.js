/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Deep Obsidian
        surface: "rgba(15, 23, 42, 0.4)", // Frosted Slate
        border: "rgba(148, 163, 184, 0.1)",
        primary: {
          DEFAULT: "#8B5CF6", // Violet
          hover: "#7C3AED",
        },
        secondary: {
          DEFAULT: "#3B82F6", // Blue
          hover: "#2563EB",
        },
        accent: "#06B6D4", // Cyan
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        tokenA: "#22C55E",
        tokenB: "#3B82F6",
        lpToken: "#8B5CF6",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'aura-gradient': "radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.05), transparent 70%)",
        'crystal-card': "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

