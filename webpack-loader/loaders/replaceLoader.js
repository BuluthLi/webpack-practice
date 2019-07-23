// https://webpack.js.org/api/loaders/#examples
// 初步感觉，和filter或者自定义指令directive挺像的
//官方建议使用loader-utils解析loader的options:
// this.callback:传递额外的信息,只有result其实和直接return是一样的
//this.async实现loader中代码异步
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    let options = loaderUtils.getOptions(this);
    console.log('5555555555555555', source, options);
    // ----------------------------------------------------
    // 直接return
    // return source.replace('world', options.name + '厉害啊！');
    // ----------------------------------------------------
    //返回额外信息
    // let result = source.replace('world', options.name + '厉害啊！');
    // this.callback(null, result);
    // ----------------------------------------------------
    //使用异步
    const callback = this.async();
    setTimeout(function () {
        let result = source.replace('world', options.name + '厉害啊！');
        // callback(null, `module.exports='${result}'`);
        //不是最后一个使用的loader，不会对应module.exports,故此不需要使用module.exports
        callback(null, result);
    }, 1000)
}
// module.exports = function(src) {
//     //src是原文件内容（abcde），下面对内容进行处理，这里是反转
//     var result = src.split('').reverse().join(''); //edcba
//     //返回JavaScript源码，必须是String或者Buffer
//     return `module.exports = '${result}'`;
//   }