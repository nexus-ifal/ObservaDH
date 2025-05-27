const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"layout-admin": "#050B17",
			},
			backgroundImage: {
				"layout-principal":
					"linear-gradient(135deg, #060C18 0%, #122144 49%, #1A326E 100%)",
			},
			boxShadow: {
				bottom: "0 1px 4px 1px rgba(0, 0, 0, 0.1), 0 0 0 0 0  rgba(0, 0, 0, 0)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
			addUtilities({
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
				},
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none',
				},
			});
		}),
	],
};
