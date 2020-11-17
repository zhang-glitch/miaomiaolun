

module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://api.vikingship.xyz",
        changeOrigin: true,
      }
    }
  },
  // 真正做到按需加载，这样不需要预加载js文件。
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
  lintOnSave: false
}