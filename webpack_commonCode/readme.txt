目的：a.减少代码冗余 b.提高加载速度
内容：公共模块moduleA，pageA页面引用subPageA,subPageA和subPageB同时引用公共模块moduleA
结论：a.splitChunks推荐使用默认配置，对包的大小上限限制一下（500kb），它实现了按需加载，(默认情况下，它只影响按需块，因为更改初始块会影响HTML文件在运行项目时应该包含的脚本标记。)
      b.对于组件(componnet)的异步加载，可以是vue-lazy-componnet,react-lazy,以及react-router提供的方案(https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
概念：a.图片懒加载：echo.js
b.资源，js模块懒加载：动态import()，require.ensure()
c.组件懒加载：见结论b