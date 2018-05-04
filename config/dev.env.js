'use strict'
const merge = require('webpack-merge')//合并
const prodEnv = require('./prod.env')//合并

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'//最终输出developmen 用于开发时和运行时的判断
})
