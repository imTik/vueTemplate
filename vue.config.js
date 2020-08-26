const path = require('path');
module.exports = {
  // 关闭eslint
  lintOnSave: false,

  publicPath: '/you_project_name',
  outputDir: 'you_project_name',

  productionSourceMap: false,

  devServer: {
    // host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/local': {
        target: 'http://192.168.35.107:8061',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/local': ''
        }
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/global.less')]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'language',
      enableInSFC: false
    }
  }
};
