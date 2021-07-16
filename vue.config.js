const path = require('path');
const Timestamp = new Date().getTime();
module.exports = {
  // 关闭eslint
  lintOnSave: false,

  publicPath: '/you_project_name',
  outputDir: 'dist',

  productionSourceMap: false,

  // 设置入口文件 每次打包加上时间戳防止缓存
  configureWebpack: {
    output: {
      filename: `js/[name].[hash:4].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`,
    }
  },

  css: {
    extract: {
      filename: `css/[name].[hash:4].${Timestamp}.css`,
      chunkFilename: `css/[name].${Timestamp}.css`,
    },
    sourceMap: false,
  },


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
