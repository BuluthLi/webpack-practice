<!-- webpack面试问题总结 -->
1.什么是webpack，他和grunt和gulp有什么不同？
答：webpack是一个模块打包器，他可以递归的打包项目中的模块，最终生成几个打包好的文件。（通过入口文件递归查找依赖，进行打包），
不同在于它支持code splitting,模块化（AMD,ESM,CommonJs），全局分析

2.什么是bundle,什么是chunk,什么是module？
答：bundle是打包出来的文件，chunk是webpack在进行模块依赖分析的时候，代码分割出来的代码块，module是开发中的单个模块。

3.什么是loader,什么是plugin?
答：loader是用来告诉webpack如何转换处理某一类型的文件，并且引入到打包出的文件中。
    plugin是用来自定义webpack打包过程的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与到webpack打包的各个流程中（生命周期），比如
    某一阶段使用CleanWebpackPlugin,某阶段使用PostCss进行优化等等，我们不用关注到底是什么阶段执行（生命周期），只需要注入plugin就可以。

4.自动生成webpack配置的工具
答：webpack-cli,vue-cli,etc等等


5.webpack-dev-serve和传统的http服务器比如nginx有什么区别？
答：webpack-dev-serve（express+HotMiddleWare）使用内存来存储webpack在开发环境下的打包文件，并且可以实现热更新，比传统的http服务对开发更加简单高效

6.什么是模块热更新？
答：模块热更新是webpack的一个功能，它可以使得代码被修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器，（实际是使用websocket，进行回调推送，一部分代码修改，就进行该代码刷新，重新执行一遍，不用全部执行） 


7.什么是长缓存？怎么实现长缓存？
答：具体见webpack-vue项目，其实就是对静态资源打包的文件进行指定文件名，和模块名，利用名字不变时，再次打开页面会调取缓存，发现文件还在（因为文件名没变），实现了长缓存，相关的插件：  new webpack.HashedModuleIdsPlugin()或者 new webpack.NamedChunksPlugin({}),  new webpack.NamedModulesPlugin({})

8. 什么是Tree-shaking,Css能Tree-shaking吗？
js使用uglifyJsPlugin进行Tree-shaking
css Tree-shaking一般使用purify-css:http://www.manongjc.com/article/9404.html