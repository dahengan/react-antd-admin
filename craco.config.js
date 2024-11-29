const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 跨域配置
  devServer: {
    // proxy: [
    //   {
    //     context: [process.env.REACT_APP_BASE_API],
    //     // target: 'http://192.168.92.12:7070',
    //     target: 'http://192.168.2.160:6011',
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: { ['^' + process.env.REACT_APP_BASE_API]: 'http://localhost:3000' }
    //   }
    // ]
  },
  webpack: {
    alias: {
      '@': resolve('./src')
    }
  }
}
