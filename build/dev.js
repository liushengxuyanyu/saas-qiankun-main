const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

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
        target: 'https://mryx.cloud.test.missfresh.net/',  //预发
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/ccs/api': {
        target: 'https://mryx.cloud.test.missfresh.net/',  //预发
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/heimdall/api': {
        target: 'https://mryx.cloud.test.missfresh.net',  //预发
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/sobot': {
        target: 'https://mryx.cloud.test.missfresh.net',  //预发
        changeOrigin: true,
        logLevel: 'debug'
      },
      '/defender/api': {
        target: 'https://mryx.cloud.test.missfresh.net',  //预发
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