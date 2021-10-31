const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const VUE_APP_URL = 'https://mryxb12.cloud.dev.missfresh.net'
// const VUE_APP_URL = 'https://mryx.cloud.test.missfresh.net'

async function start() {
  let port = 0;
  try {
    port = fs.readFileSync(path.resolve('.port'), 'utf8');
  } catch (e) {
    throw 'not found .port';
  }

  const config = require('./webpack.config')('development');
  const options = {
    contentBase: path.resolve('dist'),
    contentBasePublicPath: "/web-main",
    hot: true,
    host: '127.0.0.1',
    historyApiFallback: {
      index: 'index.html',
    },
    proxy: {
      '/helios/api': {
        target: VUE_APP_URL,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/ccs/api': {
        target: VUE_APP_URL,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/heimdall/api': {
        target: VUE_APP_URL,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/sobot': {
        target: VUE_APP_URL,
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/defender/api': {
        target: VUE_APP_URL,
        changeOrigin: true,
        logLevel: 'debug'
      },
    }
  };
  webpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, options);
  server.listen(port, 'localhost', () => {
  });
  server.invalidate(() => {
    console.log(`Project is running at http://${options.host}:${port}`);
  });
}

start().then();
