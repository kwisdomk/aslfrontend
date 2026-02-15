/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 30px rgb(0,0,0,0.04)',
        'glass-hover': '0 20px 40px rgb(0,0,0,0.06)',
        'tactical': '0 4px 20px rgb(0,0,0,0.08)',
      },
      blur: {
        'glow': '100px',
      },
    },
  },
  plugins: [],
}