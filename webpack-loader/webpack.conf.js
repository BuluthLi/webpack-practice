var path = require('path');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        // chunkFilename: '[id].[chunkhash].js'
    },
    //loader的路径解析，先查找node_modules目录，再查找loaders目录
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: 'firstCharLoader.js',
                        // loader: path.resolve(__dirname, './loaders/firstCharLoader.js'),
                    },
                    {
                        // loader:'replaceLoader.js'),
                        loader: './loaders/replaceLoader.js',
                        options: {
                            name: 'xrh'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Loader',//需要对index.html的模板title进行解析<title><%= htmlWebpackPlugin.options.title %></title>
            filename: 'index.html',
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}