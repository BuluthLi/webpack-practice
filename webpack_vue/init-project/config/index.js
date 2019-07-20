'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //服务器代理，
    /**
     * target:代理的目标地址
     * changeOrigin:是否跨域
     * headers:请求头(附带cookie等)
     * logLevel:代理的信息，日志
     * pathRewrite：路径重写：
     */
    /** 
     *  proxyTable: {
    *     "/api": {
    *      // target: 'https://mnls-znxc.ecs.yfway.com/',
    *      // target: 'http://192.168.0.72/mnls-znxc.ecs.yfway.com/v2019/public/index.php/',
    *      target: 'https://mnls-znxc.yfway.com/',
    *      changeOrigin: true,
    *       logLevel:'debug',
    *      pathRewrite: { "^/api": "" }
    *}
    */
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // autoOpenBrowser: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',//打包前后的映射，实现代码定位，方便调试

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,//控制是否开启生产环境下的sourceMap,一般不开启
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',//打包前后的映射，实现代码定位，方便调试

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    //是否开启Gzip
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    //打包报告
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
