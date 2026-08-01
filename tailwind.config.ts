import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
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
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate"),
		plugin(function ({
			addUtilities,
		}: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addUtilities: (utilities: Record<string, any>) => void;
		}) {
			addUtilities({
				".no-scrollbar scrollbar-none": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
				},
				".no-scrollbar scrollbar-none::-webkit-scrollbar": {
					display: "none",
				},
			});
		}),
	],
};
