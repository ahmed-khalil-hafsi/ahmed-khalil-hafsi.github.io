/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#14101b',      // Updated to match your blog
        primary: '#e6e6e6',   // Light text color
        accent: '#6b7fd7',    // Accent color for links/buttons
        card: '#1e1629',      // New color for card backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e6e6e6',
            a: {
              color: '#6b7fd7',
              '&:hover': {
                color: '#8b9fe7',
              },
            },
            h1: {
              color: '#ffffff',
              fontFamily: '"Source Serif Pro", serif',
            },
            h2: {
              color: '#ffffff',
              fontFamily: '"Source Serif Pro", serif',
            },
            h3: {
              color: '#ffffff',
              fontFamily: '"Source Serif Pro", serif',
            },
            h4: {
              color: '#ffffff',
              fontFamily: '"Source Serif Pro", serif',
            },
            strong: {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 