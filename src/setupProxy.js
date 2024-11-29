const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    process.env.REACT_APP_BASE_API,
    createProxyMiddleware({
      target: 'http://192.168.92.12:7070', //后台服务器地址
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.REACT_APP_BASE_API]: 'http://localhost:3000' //本地地址
      }
    })
  )
}
