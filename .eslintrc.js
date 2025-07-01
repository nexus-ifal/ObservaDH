module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		"next/core-web-vitals",
		"next/typescript",
		"plugin:prettier/recommended",
	],
	plugins: [
		"simple-import-sort",
		"prettier",
	],
	rules: {
		"linebreak-style": ["error", "unix"],
		"simple-import-sort/imports": [
			"error",
			{
				groups: [
					["^react", "^@?\\w"],
					["^@/domain/interfaces"],
					["^@/lib/utils"],
					["^@/components"],
					["^(\\.\\./mocks)"],
					["^\\.\\.(?!/?$)", "^\\../?$"],
					["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
					["^.+\\.s?css$"],
				],
			},
		],
		"simple-import-sort/exports": "error",
		"prettier/prettier": "error",
	},
	ignorePatterns: [".next/", "node_modules/", "public/", "out/", "build/"],
};
