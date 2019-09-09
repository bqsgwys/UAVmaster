module.exports = {
  baseUrl: "/",
  // 基本路径
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  //lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false,
    before: () => {},
    disableHostCheck: true,
    proxy: {
      "/uav": {
        target: "http://localhost:8080/",
        changeOrigin: true
      },
      "/staticdata": {
        target: "http://localhost:8080/",
        changeOrigin: true
      },
      "/admin": {
        target: "http://localhost:8080/",
        changeOrigin: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
