const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js')
}

module.exports = {
  entry: path.join(paths.JS, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  // Что делаем с каждый найденным модулем
  module: {
    rules: [
      {
        // Проверяем тип файла и назначаем соотв. лоадеры
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // Кроме нодмоудльс
        use: ['babel-loader']
      }
    ]
  },
  // Автоматически резолвим js и jsx расширения, 
  // чтоб писать include './App'
  resolve: {
    extensions: ['.js','.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    })
  ],
  devServer: {
    contentBase: paths.SRC
  }
}