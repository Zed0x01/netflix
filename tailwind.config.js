module.exports = {
  content: [
      "./pages/*.{ts,tsx}",
      "./components/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide'),require('tailwind-scrollbar')],
}
