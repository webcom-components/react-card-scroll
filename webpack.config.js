const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, './dist'),
        filename: "bundle.js",
        libraryTarget: "commonjs2"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
