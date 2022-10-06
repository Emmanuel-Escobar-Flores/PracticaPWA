module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,png,PNG,jpg,html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};