'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        assets: resolve('src/assets'),
        components: resolve('src/components'),
        views: resolve('src/views')
      }
    }
  }
}
