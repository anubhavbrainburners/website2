/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#040302",
        foreground: "#c9965f",
        primary: "#e87816",
        secondary: "#f79c34",
        accent: "#1a0f09",
        border: "#311a0d",
        card: "#0a0706"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      },
      fontSize: {
        body: ["0.95rem", "1.6"],
        h1: ["2.4rem", { lineHeight: "1.05", fontWeight: "700" }],
        display: ["4.4rem", { lineHeight: "1.02", fontWeight: "700" }]
      },
      boxShadow: {
        glow: "0 0 90px rgba(232, 120, 22, 0.24)"
      },
      keyframes: {
        marque: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        marque: "marque var(--duration, 40s) linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
