module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue:37.5,
      propList: ['*'],
      // 配置不需要转换的内容
      exclude:'github-markdown'
    },
  },
};