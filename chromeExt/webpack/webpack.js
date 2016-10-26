const path = require('path')

console.log(__dirname)
module.exports = {
  entry: {
    popup: path.resolve(__dirname, '..', 'dev', 'index.js')
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'] 
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          "presets": ["es2015", "react"]
        }
      }
    ]
  }
}