const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const port = process.env.PORT || 3000;

module.exports = {

    name : 'React-webpack-setting', // 웹팩 설정 이름

    // 개발환경
    mode: 'development',

    devtool : 'inline-source-map',

    resolve : {
        alias: {
            "@": path.resolve(__dirname, "..src/"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },

    // 애플리케이션 시작 경로
    entry: './src/index.tsx',

    // 번들된 파일 경로
    output: {
        path: path.join(__dirname, '/dist'), //빌드 위치
        filename : 'app.js'  //웹팩 빌드 후 최종적으로 만들어질 파일
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            { //style-loader, css-loader 규칙 설정
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test:/\.(png|jpg|gif)$/,
                use : 'file-loader'
            },
            {
                test : /\.txt$/,
                use : 'raw-loader'
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ],

    // 개발 서버 설정
    devServer: {
        host: 'localhost',
        port: port,
        open: true, // open page when start
    },
};