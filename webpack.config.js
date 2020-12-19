const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
   mode: 'development',
   entry: './src/script.js',
   devtool: 'inline-source-map',
   devServer: {
      contentBase: './public/',
      publicPath: '/',
      inline: true,
      hot: true,
      open: true,
      compress: true,
      port: 3000,
      host,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
      }),
   ],
   output: {
      filename: 'static/js/bundle.js',
  },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
         },
      ],
   },
}