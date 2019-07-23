const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[chunkHash].js',
        chunkFilename: '[id].[chunkHash].js'
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyrightWebpackPlugin({
            name: 'xrh'
        })
    ]
}