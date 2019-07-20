// webpack.config.js需要使用的是commonJs规范
// 每次微博pack打包，dist的文件由于使用hash值做为名字一部分，不会覆盖，插件clean-webpack-plugin提供了一个打包前删除指定目录
// npm install clean - webpack - plugin
// const CleanWebpackPlugin = require("clean-webpack-plugin");
//   new CleanWebpackPlugin([
//         "./dist"
//     ]),   //参数是一个数组，数组中是需要删除的目录名
module.exports = {
    // 4个要素
    // entry: {
    //     ...
    // },
    // output: {
    //     ...
    // },
    // module: {
    //     rules: [
    //         ...
    //     ]
    // },
    // plugins: [
    //   ...
    // ]



    // 入口
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:5].js'
    }
}