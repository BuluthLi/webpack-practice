/**
 * 常用命令
 * 打包文件（无配置文件）：webpack fileanme.js -o outputfilename.js
 * 打包文件（有配置文件webpack.config.js）：webpack
 * 打包文件（有配置文件,但名称是自定义的webpack.conf.js，不是webpack.config.js）：webpack --config webpack.conf.js
 */



//使用es module导入，对应的sum.js应该用es module导出
import sum from './sum';

// 使用commonJs
const minus = require('./minus');

// 使用amd(异步,打包后会形成两个chunk)
// require(['./multiple'], function (multiple) {
//     console.log('multiple(2,3)=', multiple(2, 3));
// })
// 测试
const other = require('./other');

console.log('sum(23,24)=', sum(23, 24));
console.log('minus(24,17)=', minus(24, 17));
console.log('other(100,50)=', other(100, 50));