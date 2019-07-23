class CopyrightWebpackPlugin {
    constructor(options) {
        console.log('我是一个插件，被使用了,并且携带了一个参数options=' + options.name);
    }
    apply(compiler) {
        //同步
        compiler.hooks.shouldEmit.tap('CopyrightWebpackPlugin', compilation => {
            console.log('我是同步方法');
            compilation.assets['shouldEmit.txt'] = {
                source: function () {
                    return 'CopyrightWebpackPlugin on shouldEmit of webpack'
                },
                size: function () {
                    // return 15 // 上面 source 返回的字符长度
                }
            }
        })
        //异步
        // 找到 emit 这个时刻，将打包结果放入 dist 目录前执行，这里是个 AsyncSeriesHook 异步方法,(对应的执行一下cb()方法)
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            console.log('hooks执行了，我是一个异步方法');
            //compilation 这个参数里存放了这次打包的所有内容，返回结果是一个对象，app.62a84d932d96f80b0fc0.js 是 key，也就是打包后生成的文件名及文件后缀，
            console.log(compilation.assets);
            compilation.assets['emit.txt'] = {
                source: function () {
                    return 'CopyrightWebpackPlugin on emit of webpack'
                },
                size: function () {
                    return 15 // 上面 source 返回的字符长度
                }
            }
            cb();
        })

    }
}
module.exports = CopyrightWebpackPlugin;