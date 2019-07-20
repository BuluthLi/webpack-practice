var path = require('path');
module.exports = {
    entry: {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash:5].bundle.js',
        chunkFilename: '[name].[hash:5].chunk.js'
    },
    // module: {
    //     rules: []
    // },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 500000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // plugin: []
}