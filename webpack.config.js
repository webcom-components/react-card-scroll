const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = {
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'lib/assets'),
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('style','css?modules!sass')}
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css")
    ]
};
