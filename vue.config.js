const path = require('path');
module.exports = {
  // 关闭eslint
  lintOnSave: false,

  publicPath: '/you_project_name',
  outputDir: process.env.outputDir,

  productionSourceMap: false,

  devServer: {
    // host: 'localhost',
    port: 8080,
    https: false,
    open:true,
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_PROXY]: {
        target: process.env.VUE_APP_PROXY_URL,
        ws: true,
        changOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_PROXY]: ''
        }
      },
    }
  },

  chainWebpack: config => {
    config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, { limit: 10240 }))
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/global.less")] 
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'language',
      enableInSFC: false
    }
  }
}
