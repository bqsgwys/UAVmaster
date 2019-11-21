const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  //baseUrl: '/', // 基本路径
  publicPath: "/", // 输出文件目录
  outputDir: "dist",
  lintOnSave: true, // eslint-loader 是否在保存的时候检查

  /* webpack配置 see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md */
  chainWebpack: () => {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins = [
        ...config.plugins,
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0
        })
      ];
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              ecma: 8,
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              extractComments: "all",
              compress: {
                ecma: 8,
                drop_console: true,
                passes: 2,
                warnings: true
              }
            }
          })
        ]
      };
    }
  },
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件

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
    before(app) {
      app;
    },
    disableHostCheck: true,
    proxy: {
      "ws:///socket.io": {
        target: "ws://localhost:3000/",
        ws: true
      },
      "/socket.io": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
