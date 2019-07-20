sass-loader,less-loader进行sass,less语法向css转化
css-loader使得页面可以像引入js一样(import)，引入css文件：options:
1.alias:解析的别名
2.importLoader:@import
3.Minemize:是否压缩(webpack新版该属性取消，建议使用plugin)
4.modules:是否启用css-moudles
style-loader创建style标签，引入css文件到页面上:options:1.transform,在css文件加入浏览器页面时，会对浏览器环境监测，做出对应的css转换（例如在ie,就把红色变绿色）；这个动作是在样式表加入浏览器时进行的，每个css文件执行一次

顺序（实际从右到左解析）
style-loader  css-loader   [postcss-loader]  less/sass-loadre

css Modules模块化语法：(使用webpack配置现代化vue,react开发后，很少使用)(学习配置时测试失败)
:local ====>局部样式
:global ====>全局样式
compose ====>引入样式
compose: ... from path ====>从某个路径引入样式 eg: compose : base-box from ./app.


<!-- css代码提取 -->
ExtractTextPlugin

<!-- 浏览器兼容前缀 （vue-cli将其作为默认配置了）-->
autoprefixer

<!-- 浏览器配置设置 -->
根据提供的目标浏览器的环境来，智能添加css前缀，js的polyfill垫片,来兼容旧版本浏览器，而不是一股脑的添加。避免不必要的兼容代码，以提高代码的编译质量
browserslist:一般放在package.json中

"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]



  <!-- tree shaking -->
 js(测试通过): UglifyJsPlugin    
 css(测试异常): Purify  css          cnpm i purifycss-webpack glob-all -D 
                                    const PurifyCSS = require('purifycss-webpack')
                                    const glob = require('glob-all')  
                                    new PurifyCSS({
                                        paths:glob.sync([
                                            path.resolve(_dirname,'./*.html),
                                            path.resolve(_dirname,'./src/*.js)
                                        ])
                                    })

<!-- 图片处理 -->
file-loader
url-loader
img-loader
postcss-sprites//雪碧图体验失败，autoprefixer前缀成功


<!-- 引入第三方js库 -->
1.常见库，例如vue,react,axios使用script标签引入库的cdn地址,在webpack.config.js里面配置externals选项
2.ProvidePlugin：new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});
3.imports-loader:https://webpack.js.org/loaders/imports-loader/#root;
            //imports-loader引入第三方库
            {
                test: path.resolve(__dirname, './app.js'),//指定模块
                use: [
                    {
                        loader: "imports-loader",
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            }

<!--自动生成html文件和插入js、css  -->
 html-webpack-plugin : new HtmlWebpackPlugin({
      // 根据模板生成的文件名称
      filename: config.build.index,
      //模板
      template: 'index.html',
      // 自动插入js和css
      inject: true,
      //加载和app入口对应文件的js和css相关依赖(不指定chunks，全部加载，一般单页面应用不指定chunks)
      chunks: ['app'],
      minify: {
        removeComments: true,
        //去空格，单行压缩
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),


<!-- html-loader -->



<!-- 好用的提前载入webpack加载代码 -->
inline-manifest-webpack-plugin
html-webpack-inline-chunk-plugin


1.rules:[{
    {
        test:/\.js$/,
        use:[{
            loader:'babel-loader',
            options:{
                presets:['env']
            }
        }]
    }
}]
2.plugins:[
    new webpack.optimize.CommonsChunkPlugin({
        name:'manifest'
    })
]
3.var HtmlWebpackInlineChunkPlugin=require('html-webpack-inline-chunk-plugin');
new HtmlWebpackInlineChunkPlugin({
    inlineCunks:['manifest],//提前加载的文件（这里的文件manifest其实是CommonsChunkPlugin配置的webpack提取出来的，自己生成的一些公用代码,类似于base.js功能（基础架构js）），不需要发送http请求，就会被插到html中，达到减少http请求的效果
})
