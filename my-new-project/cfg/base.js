'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
var proxy = require('http-proxy-middleware');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'), //打包输出的路径

    filename: '[name].js', //打包后的名字 npm  run dist 需要设置 具体输出的名字 ======设置的名字需要与cfg/dist同步名字
    // filename: '[name].js' 或 r_search.js npm run serve
    publicPath: defaultSettings.publicPath //html引用路径，在这里是本地地址。
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    host: '192.168.1.160',
    inline: true,
    progress: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    //跨域设置
    proxy: {
      '/wap': {
        target: 'http://dev.thgo8.com',

        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/wap': '/wap'
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000', 
          // override target 'http://www.example.org' to 'http://localhost:8000' 
          // 'http://localhost:8000/r_search.html/R_det/': 'http://dev.thgo8.com'
        }
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {}
};