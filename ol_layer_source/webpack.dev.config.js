const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 入口文件
    entry:{
        app:'./src/index.js'
    },

    devtool: 'inline-source-map',
    
    // 打包文件输出路径和文件名
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },  

    // webpack-dev-server web服务配置
    devServer:{
        port: 8223,
        contentBase: path.join(__dirname,'./dist'),
        historyApiFallback: true,
        host: 'localhost',
    },
    
    /**
     * 配置各种loader
     */
    module:{
        rules:[
            // babel-loader
            {
                test:/\.js$/,
                // 缓存编译结果
                use:['babel-loader?cacheDirectory=true'],
                // 解析 src 源码目录下的js文件
                include:path.join(__dirname,'src')
            }
        ]
    }
}