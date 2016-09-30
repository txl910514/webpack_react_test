'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'client/js/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    //热替换
    new webpack.optimize.OccurenceOrderPlugin(),
    //生成html5文件
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    //提取css文件
    new ExtractTextPlugin('[name]-[hash].min.css'),
    //最小化javascript块压缩
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        //警告
        warnings: false,
        //生成兼容ie8的代码
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false, //添加模块源代码
      modules: false  //添加模块信息
    }),
    //DefinePlugin允许您创建全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,//注意是正则表达式，不要加引号，匹配要处理的文件
        exclude: /node_modules/,//排除不处理的目录
        loader: 'babel',
        //查询条件
        query: {
          "presets": ["es2015", "stage-0"]
        }
      }, {
        //处理json文件
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        //ExtractTextPlugin.extract提取函数
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]')
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
    modulesDirectories: ['node_modules', path.join(__dirname, '/client/')],
  }
};
