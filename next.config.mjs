// tailwind.config.js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // ✅ Include 'app' if you're using App Router
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')", // External image
      },
    },
  },
  plugins: [],
}
