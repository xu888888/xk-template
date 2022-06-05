/*
 * @Author: 徐凯
 * @Date: 2022-05-28 19:03:34
 * @LastEditors: 徐凯
 * @LastEditTime: 2022-06-05 09:12:27
 * @FilePath: \react\test\config\webpack.dev.js
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackBar = require('webpackbar');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-only',
  devServer: {
    compress: true,
    hot: true,
    https: true,
    open: true,
    static: resolve(__dirname, 'build'),
    host: 'localhost',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    proxy: {
      // '/v2': {
      //   // target: 'https://oceankeeper.alibaba.net/',
      //   target:'https://www.baidu.com',
      //   changeOrigin:true,
      //   secure: false,
      // },
      // '/soso': {
      //   target: 'https://c.y.qq.com',
      //   changeOrigin: true
      // }
    },
  },
  plugins: [new WebpackBar()],
});
