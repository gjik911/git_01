const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = merge(webpackConfig, {
    devtool: 'eval-source-map', //  快速生成完整的sourcemap，但打包后输出的JS文件执行具有性能和安全的隐患。
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [  //  用来处理各种各样的任务,包括打包优化和压缩、重新定义环境中的变量
        new webpack.HotModuleReplacementPlugin(),   //  热更新
    ],
    devServer: {
        // contentBase: "./public", //  告诉服务器从哪里提供内容，默认跟文件夹
        // compress: true, //  一切服务都启用gzip 压缩
        historyApiFallback: true, //    找不到页面时都跳转到index.html
        inline: true,
		host: "0.0.0.0",  // 如果你希望服务器外部可访问，设为0.0.0.0，win8 下自启浏览器可能是因为没设置为localhost不能访问
		port: "8090",
		open: false, // 开启浏览器
        hot: true,   // 开启热更新
        // https: { //  使用https访问
        //     key: fs.readFileSync("/path/to/server.key"),
        //     cert: fs.readFileSync("/path/to/server.crt"),
        //     ca: fs.readFileSync("/path/to/ca.pem"),
        //   }
        proxy: {
            "/home": {
              target: "http://127.0.0.1:8000",
            //   secure: false,    //  https时是否检查证书
              bypass: function(req, res, proxyOptions) {    //  页面请求不代理
                return !(req.headers.accept.indexOf("html") !== -1);
              }
            }
          }
    }

});
