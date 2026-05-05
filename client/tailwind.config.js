/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        charcoal: "#101014",
        graphite: "#171722",
        fog: "#b8b8c7",
        electric: "#00F5FF",
        violet: "#6C63FF",
        accent: "#FF2E63",
        softtext: "#EAEAEA"
      },
      boxShadow: {
        glow: "0 0 42px rgba(0, 245, 255, 0.28)",
        "soft-black": "0 24px 80px rgba(0, 0, 0, 0.34)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "radial-cinema": "radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.16), transparent 34%), radial-gradient(circle at 80% 8%, rgba(108, 99, 255, 0.18), transparent 30%)",
        "primary-gradient": "linear-gradient(135deg, #6C63FF 0%, #00F5FF 100%)"
      }
    }
  },
  plugins: []
};
