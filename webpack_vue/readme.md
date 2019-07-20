<!-- vue-cli结构和测试 -->
1.结构
2.unit测试成功：
 使用jest进行单元测试过程中，出现的error解决方法：http://www.mamicode.com/info-detail-2613430.html
3.e2e实验失败
4.eslint一般不用
4.npm run build --report(生成打包报告，可以查看各个模块打包状况和大小，十分实用)



<!-- 模块热更新（了解实现流程用，实际项目不需要，相关loader实现了） -->
/**
*如果设置了模块热更新，检测到./component/a有更新，执行callback，并更新
*/
if(module.hot){
    module.hot.accept('./component/a',function(){
        app.removeChild(list);
        let ComponentA=require('./component/a').componentA;
        let newList=ComponentA();
        app.appendChild(newList);
        list=newList;
    });
}

<!-- 实战优化，以vue项目中的first-project(高仿饿了么)项目为实例进行操作 -->
Offical analyse Tool:
    webpack --profile --json >stats.json
    webpack --profile --json | Out-file 'stats.json' -Encoding OEM

    http://webpack.github.io/analyse/

webpack-bundle-analyzer:
    插件：BundleAnalyzerPlugin

//打包速度：
    第一次打包：9578ms
    第二次打包：先分离出第三方包(webpack.dll.conf.js的配置和对应的webpack.prod.conf.js的修改)(使用package.json文件中添加快捷命令"build:dll": "webpack --config    webpack.dll.config.js")
    第三次打包：并行打包文件（uglifyJsPlugin设置parallel，webpack4自动集成该配置，以及关掉sourceMap）
    第四次打包：对babel-loader知道include只包含src目录，提升明显(happyPack一般中大型项目使用，缓存，例如webpack4.0的splitChunks配置缓存组和js分组)

//长缓存优化：（vue-cli也做了相关配置，可以参考观看）（维持verder.js的版本号不变，浏览器就不会频繁重复请求资源，实现长缓存）

1.独立打包vender：
entry:{
    app:'./src/main.js',//业务代码
    vendor:['vue','vue-router']
}
output:{
    ...
    filename:'[name].[chunkhase].js',//使用chunkhash
}
plugins:[
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        minChunks:Infinity
    })
]
2.抽出manifest(webpack runtime):
plugins:[
       new webpack.optimize.CommonsChunkPlugin({
        name:'manifest',//选一个entry中没有的名字，会被默认为运行时相关的文件
    })
]
3.使用NamedChunksPlugin,NamedModulesPlugin(给每个模块一个确切的id):
plugins:[
    new webpack.NamedChunksPlugin({}),
    new webpack.NamedModulesPlugin({})
]
4.动态模块给定模块名称（使用魔法注释）:
import(/*webpackChunkName:'ladash'*/'lodash.js').then(function(a){
    console.log(a);
})
//蒙娜丽莎路由组件动态模块写法 component:()=>import(/*webpackChunkName:'main' */'../components/main/Main.vue')


<!-- 多页面应用配置(morepage-project)-->
其实就是分别提出css,提出vender,manifest,app等js,写上多个entry
(十分注意：
1.babel-loader相关的babel-core的版本适配问题
2.webpack和webpack-cli的适配问题
3.提取单个css的extract-text-webpack-plugin与webpack(尤其是webpack4.0)的适配问题
)