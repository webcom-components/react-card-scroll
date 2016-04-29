const WebpackDevServer = require('webpack-dev-server')
const webpack = webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const compiler = webpack({
    entry: ["./example/index.js","./example/theme.scss", "./hotReloadScript.js", "webpack/hot/dev-server"],
    output: {
        path: path.join(__dirname, './example/dist'),
        filename: "example.bundle.js",
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.scss/, loader: ExtractTextWebpackPlugin.extract('style','css!sass')},
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './example/index.html',
            inject: 'body'
        }),
        new ExtractTextWebpackPlugin("styles.css")
    ]
})

new WebpackDevServer(compiler, { // Start a server
    contentBase: "./example",
    hot: true
}).listen(8081)
