/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist "professor" palette — warm cream + oxblood
        paper: '#faf8f3',     // page background
        ink: '#1a1a1a',       // primary text
        muted: '#6b665e',     // secondary text (warm grey)
        subtle: '#8a857c',    // tertiary text / captions
        accent: '#7b2d26',    // oxblood — links & small highlights
        accentDark: '#5e211c',
        rule: '#e6e0d4',      // hairline borders
        card: '#f3eee4',      // very subtle raised panel
        // Legacy tokens repurposed to light values so older pages don't render dark
        dark: '#faf8f3',
        primary: '#1a1a1a',
      },
      fontFamily: {
        // Body: refined old-style system serif (no web font needed)
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', '"Book Antiqua"', 'Georgia', 'Cambria', 'serif'],
        // Display headings
        display: ['"Source Serif Pro"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
            maxWidth: '68ch',
            a: {
              color: '#7b2d26',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { color: '#5e211c' },
            },
            h1: { color: '#1a1a1a', fontFamily: '"Source Serif Pro", Georgia, serif' },
            h2: { color: '#1a1a1a', fontFamily: '"Source Serif Pro", Georgia, serif' },
            h3: { color: '#1a1a1a', fontFamily: '"Source Serif Pro", Georgia, serif' },
            h4: { color: '#1a1a1a', fontFamily: '"Source Serif Pro", Georgia, serif' },
            strong: { color: '#1a1a1a' },
            blockquote: {
              color: '#3a3a3a',
              fontStyle: 'italic',
              borderLeftColor: '#7b2d26',
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
