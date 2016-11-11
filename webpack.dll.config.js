const webpack = require('webpack');

const vendors = [
	'jquery',
	'vue',
	'vue-router',
	'vuex',
	'vue-resource',
	'vue-select',
	'vue-validator',
	'vuex-router-sync',
	'chart.js',
	'es6-promise',
	'nprogress',
	'simditor',
	'jquery-knob'
];

module.exports = {
	output: {
		path: 'build',
		filename: '[name].[hash].js',
		library: '[name].[hash]',
	},
	entry: {
		"lib": vendors,
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'build/manifest.json', // mainfest.json 存放路径
			name: '[name].[hash]', // 和 outpubt library保持一致
			context: __dirname,
		}),
	],
};