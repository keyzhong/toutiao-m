module.exports = {
  devServer: {
    port: 8080,
    hot: true/* ,
    proxy: {
      '/api': {
        target: 'https://toutiao.m.lipengzhou.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    } */
  }
}
