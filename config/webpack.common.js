/*
 * @Author: 徐凯
 * @Date: 2022-05-28 19:03:21
 * @LastEditors: 徐凯
 * @LastEditTime: 2022-06-05 09:45:58
 * @FilePath: \react\test\config\webpack.common.js
 */
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const cssLoaders = (preNumber) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: preNumber + 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
            },
          ],
          'postcss-normalize',
        ],
      },
      sourceMap: isDev,
    },
  },
];

module.exports = {
  entry: {
    app: resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: resolve(__dirname, '../dist'),
  },
  target: isDev ? 'web' : 'browserslist',
  resolve: {
    alias: {
      '@src': resolve(__dirname, '../src'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@plugins': resolve(__dirname, '../src/plugins'),
      '@components': resolve(__dirname, '../src/components'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    antd: 'antd',
    axios: 'axios',
    lodash: '_',
    dayjs: 'dayjs',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssLoaders(0),
      },
      {
        test: /\.less$/,
        use: [
          ...cssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...cssLoaders(1),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: 'url-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../template.html'),
      inject: true,
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
  ],
};
