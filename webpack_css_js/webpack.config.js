var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        // publicPath: './dist'
        publicPath: './dist/'
    },
    // 别名
    resolve: {
        //模块从node_modules或者alias寻找
        alias: {
            // 指定特殊文件路径下的jquery模块
            jquery$: path.resolve(__dirname, './js/jquery.js')
        }
    },
    module: {
        rules: [
            {
                // test: /\.css$/,
                test: /\.less$/,
                use: [
                    // 一般style-loader,css-loader是更为常见的；style-loader/url配合file-loader了解即可
                    {
                        loader: 'style-loader',
                        // loader: 'style-loader/url',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true
                            // modules: true,//css模块化
                            // localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        }
                        // loader: 'file-loader',
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         ident: 'postcss',
                    //         plugins: [
                    //             // require('postcss-sprites')(),
                    //             // require('postcss-cssnext')(),
                    //             require('autoprefixer')()
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            // {
            //     test: /\.css$/,//此处测试，实际css后缀文件不能只用postcss-loader解析
            //     use: [
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: [
            //                     // require('postcss-sprites')(),
            //                     // require('postcss-cssnext')(),
            //                     require('autoprefixer')()
            //                 ]
            //             }
            //         },
            //     ]
            // },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     //options可以省略
                    //     options: {
                    //         publicPath: '',//publicPath:'./'
                    //         outputPath: 'img/',
                    //         useRelativePath: true
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 110000,//小于110k(实际操作不能这么大)转换成base64
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 5000,
                            publicPath: './dist/',//基于webpack的公共路径，不存在不会新建
                            outputPath: 'fonts',//基于publicPath的输出路径，不存在会新建
                            useRelativePath: true
                        }
                    }
                ]
            },
            //imports-loader引入第三方库
            // {
            //     test: path.resolve(__dirname, './app.js'),//指定模块
            //     use: [
            //         {
            //             loader: "imports-loader",
            //             options: {
            //                 $: 'jquery'
            //             }
            //         }
            //     ]
            // }
        ]
    },

    plugins: [
        // 打包前清除dist
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            // 用$代替jquery
            $: 'jquery',
        })

    ]
}