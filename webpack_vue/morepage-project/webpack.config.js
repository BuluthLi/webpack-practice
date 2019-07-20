// 多页面单个配置文件尝试（非常成功，nice）
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离出单独的css
const path = require('path');
const baseConfig = {
    entry: {
        react: 'react',
        // a: './src/pages/a.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {

        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'react',
        //     minChunks: Infinity
        // }),
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css'
        })
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './src/index.html'
        // })

    ]
}
const generatePage = function ({
    title = '',
    entry = '',
    template = "./src/index.html",
    name = '',
    chunks = []
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                filename: name + '.html'
            })
        ]
    }
}
const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a.js'
        },
        name: 'a',
        chunks: ['react', 'a']
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b.js'
        },
        name: 'b',
        chunks: ['react', 'b']
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c.js'
        },
        name: 'c',
        chunks: ['react', 'c']
    })
]
console.log(merge([baseConfig].concat(pages)));
module.exports = merge([baseConfig].concat(pages));