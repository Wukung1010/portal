const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname, './index.js'),
	devtool: 'source-map',
	output: {
		path: path.join(__dirname),
		filename: 'app.bundle.js',
		library: 'portal_application',
    libraryTarget: 'window'
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [
			{test: /\.vue$/, use: ['vue-loader']},
			{test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}