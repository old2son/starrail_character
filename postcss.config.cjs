// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 2,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.no-vw'], // 不转换的类名
      minPixelValue: 1, // 小于或等于 1px 不转换
      mediaQuery: false, // 是否处理媒体查询里的 px
      exclude: [/node_modules/],
    }
  }
}
