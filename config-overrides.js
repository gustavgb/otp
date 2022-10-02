/* eslint-disable */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { useBabelRc, override, addWebpackResolve } = require('customize-cra')
const webpack = require('webpack')

module.exports = override(
  useBabelRc(),
  addWebpackResolve({
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify')
    }
  })
)
