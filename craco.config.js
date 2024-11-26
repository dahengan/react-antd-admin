module.exports = {

  // 跨域配置
  devServer: {
    proxy: {
      [process.env.REACT_APP_BASE_API]: {
        target: 'http://192.168.92.12:7070',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.REACT_APP_BASE_API]: ''
        }
      }
    }
  }
}