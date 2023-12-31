const config = require('./webpack.config')
module.exports = Object.assign({}, config, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        open: true, 
        hot: true, 
        port: 8000, 
        static: "./public", 
        historyApiFallback: true,
        //proxy: {
          // '/': {
          //   target: 'http://127.0.0.1',
          //   pathRewrite:{'^/':'/'},
          //   secure: false,
          //   changeOrigin: true,
          // },
        //}
    },
})
