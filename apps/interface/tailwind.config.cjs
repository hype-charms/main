/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{jsx,tsx}",
    "./src/components/**/*.{jsx,tsx}",
    "./src/containers/**/*.{jsx,tsx}",
    "./src/context/**/*.{jsx,tsx}"
  ],
  plugins: [],
  theme: {
    screens: {
      sm: '480px',
      md: '800px',
      lg: '1000px',
      xl: '1440px',
    },
    colors: {
      "primary": "#ffffff",
      "primary-text": "#000000",
      "secondary": "#3f3f46",
      "secondary-text": "#a1a1aa",
      "secondary-light": "#f5f5f4",
      "secondary-dark": "#18181b",
      "accent-one": "#0f766e",
      "accent-two": "#ef4444",
    },
    fontFamily: { 'mono': ['"Nova Flat"', 'ui-monospace', 'SFMono-Regular'], 'sans': ['"Noto Sans"'] },
  },
};
