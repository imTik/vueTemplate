module.exports = {
  presets: [
    ['@vue/app', {
      modules: false,
      target: {
        "browsers": [
          "> 1%",
          "last 2 versions",
          "not ie <= 8",
          "Android >= 4",
          "iOS >= 8"
        ]
      },
      polyfills: [
      'es6.promise',
      'es6.symbol'
      ]
    }]
  ],
  // 按需引入
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
