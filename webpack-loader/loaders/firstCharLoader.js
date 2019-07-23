const loaderUtils = require('loader-utils');
module.exports = function (source) {
    let options = loaderUtils.getOptions(this);
    console.log('666666666666', source, typeof source, options);
    let result = source.replace('x', "X");
    //不需要这种写法
    // return result;
    this.callback(null, `module.exports='${result}'`);
}