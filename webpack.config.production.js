const webpack = require('webpack')
const webpackFailPlugin = require('webpack-fail-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = require('./webpack.config.base.js')

module.exports = function () {
  const myProdConfig = webpackConfig
  myProdConfig.output.filename = '[name].[hash].js'

  myProdConfig.plugins = myProdConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    webpackFailPlugin
  )

  return myProdConfig
}
