/** @type {import('prettier').Config} */
module.exports = {
	semi: false,
	tabWidth: 2,
	useTabs: true,
	printWidth: 80,
	singleQuote: true,
	jsxSingleQuote: true,
	bracketSpacing: true,
	endOfLine: 'lf',
	arrowParens: 'avoid',
	trailingComma: 'none',
	plugins: ['prettier-plugin-tailwindcss']
}
