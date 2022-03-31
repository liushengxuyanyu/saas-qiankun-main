const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require('path')
const config = require('./webpack.config')('development')
const TARGET = 'https://mryxb12.cloud.dev.missfresh.net/' // 开发/b12
// const TARGET = 'https://mryx.cloud.test.missfresh.net/' // 测试/b6

const PORT = 3001

async function start() {
  const options = {
    contentBase: path.resolve('dist'),
    contentBasePublicPath: "/web-main",
    hot: true,
    host: '127.0.0.1',
    historyApiFallback: {
      index: 'index.html',
    },
    proxy: {
      '/download/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/tms/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/helios/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/ccs/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/heimdall/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/sobot': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/defender/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/retail-portal/api': {
        target: TARGET,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
  webpackDevServer.addDevServerEntrypoints(config, options)
  const compiler = webpack(config)
  const server = new webpackDevServer(compiler, options)
  server.listen(PORT, 'localhost', () => {
  })
  server.invalidate(() => {
    console.log(`Project is running at http://${options.host}:${PORT}`)
  })
}

start().then()
