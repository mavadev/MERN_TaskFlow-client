const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				navbar: colors.slate[200],
				primary: colors.emerald,
				darken: colors.slate,
				dark: colors.gray[900],
				card: colors.white,
			},
		},
	},
	plugins: [],
};
