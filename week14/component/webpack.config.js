module.exports = {
  // 设置编译模式为开发模式
  mode: 'development',
  // 添加编译入口
  entry: './main.js',
  // 添加文件资源读取插件
  module: {
    rules: [
      {
        // 读取 js|jsx 资源的支持
        test: /\.jsx?$/,
        use: [
          // 多线程编译
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          // 加缓存
          'babel-loader?cacheDirectory=true',
        ],
        exclude: /node_modules/,
      }
    ]
  }
}