/**
 * Created by root on 23/08/16.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //map
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/js/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    //生成html5文件
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    //热替换
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //DefinePlugin允许您创建全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js?$/, //注意是正则表达式，不要加引号，匹配要处理的文件
      include: [path.join(__dirname, '/client/js')], //把要处理的目录包括进来
      loader: 'eslint-loader',
      exclude: /lib/, //排除不处理的目录
    }],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        //查询条件
        query: {
          "presets": ["es2015", "stage-0"]
        }
      }, {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        //您可以配置生成的鉴别与localIdentName查询参数(缺省(散列:base64])。例如:css-loader吗?localIdentName =(路径)[名字]——(本地)——(散列:base64:5)更易于调试。
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }, {
        test: /\.(jpe?g|png|gif|bmp|ico)$/i,
        //将一个文件从你的上下文目录复制到输出目录保留完整的目录结构,您可以使用? name =(路径)[名字]。[ext]。
        loader: 'file?name=img/[name].[ext]',
      }
    ]
  },
  resolve: {
    //替换模块
    alias: {

    },
    //数组应该用来解析模块的扩展，为了发现js文件扩展
    extensions: ['', '.js'],
    //
    modulesDirectories: ['node_modules', path.join(__dirname, '/client/')],
  }
};