'use strict'
//webpack的配置
const path = require('path')//引入node
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')//引入webpack 使用lodash
//const HtmlWebpackPlugin = require('html-webpack-plugin') //将html打包
//const ExtractTextPlugin = require('extract-text-webpak-plugin')//打包的css拆分 抽离一部分出来 
//const CopyWebpackPlugin = repuire('copy-webpak-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {//入口配置 编译入口文件
    app: './src/main.js'
  },
  output: {//webpack如何输出
    path: config.build.assetsRoot,//输出的文件路径
    filename: '[name].js',//输出的文件名称--app.js
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {//解析模块的可选项
    extensions: ['.js', '.vue', '.json'],//用到文件的扩展名 自动补全文件后缀 比如应用文件不写.vue
    alias: {//提供别名列表 缩短长度
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'api': resolve('src/api'),
      'base': resolve('src/base')
   }
  },
  module: {//针对什么文件提供什么编译  模块的查找目录 配置其他的css等文件
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]//只对这些文件的该文件检查
      },
      {//图片loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,//文件大小小于10KB的时候 会打包到编译后的文件里面 如果大于10KB的话会单独生成一个文件
          name: utils.assetsPath('img/[name].[hash:7].[ext]')//打包文件名的规则 当前文件下的utils.js
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
    //exclude:[] 不匹配选项 （优先级高于text和include）
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [//插件的引用 压缩 分离美化
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
  ]  
}
