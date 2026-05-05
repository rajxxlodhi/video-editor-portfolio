/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        charcoal: "#0b0f17",
        graphite: "#121826",
        fog: "#aab4c5",
        electric: "#24d3ff",
        violet: "#8b5cf6"
      },
      boxShadow: {
        glow: "0 0 40px rgba(36, 211, 255, 0.24)",
        "soft-black": "0 24px 80px rgba(0, 0, 0, 0.34)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "radial-cinema": "radial-gradient(circle at 20% 20%, rgba(36, 211, 255, 0.12), transparent 34%), radial-gradient(circle at 80% 8%, rgba(139, 92, 246, 0.12), transparent 30%)"
      }
    }
  },
  plugins: []
};
