const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const aliases =require('./aliases')

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '.env' : '.env.development'),
});

module.exports = {
  name: 'react-typescript', // 웹팩 설정 이름

  entry: {
    app: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    alias: aliases.webpack,
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: 'file-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'public/meta' }, // meta 폴더를 dist 에 복사
    //    ],
    // }),
  ],
};
