const webpack = require('webpack')
const webpackFailPlugin = require('webpack-fail-plugin')
const TerserPlugin = require('terser-webpack-plugin');


const webpackConfig = require('./webpack.config.base.js')

module.exports = function () {
  const myProdConfig = webpackConfig
  myProdConfig.output.filename = '[name].[hash].js'

  myProdConfig.optimization = {
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ]
  };

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
