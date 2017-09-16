[
	{
		"start": 6,
		"end": 35,
		"data": "A cross-platform way to launch files from Node.\n\nDirect copy of:\nnpmjs: \thttps://www.npmjs.com/package/opn\ngithub: https://github.com/sindresorhus/opn\n\n\n### USAGE \n\n\n\tconst opn = require('opn');\n\n\t// Opens the image in the default image viewer\n\topn('unicorn.png').then(() => {\n\t\t// image viewer closed\n\t});\n\n\t// Opens the url in the default browser\n\topn('http://sindresorhus.com');\n\n\t// Specify the app to open in\n\topn('http://sindresorhus.com', {app: 'firefox'});\n\n\t// Specify app arguments\n\topn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});\n\n@class opn\n@package documon"
	}
]