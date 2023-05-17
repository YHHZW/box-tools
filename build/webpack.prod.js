const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    // 指定入口文件
    entry: {
        form: path.join(__dirname, '../src/components/form')
    },

    // 开发模式使用，方便查错误
    devtool: "inline-source-map",

    mode: "production",

    // 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/lib/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: {
            name: '[name]',
            type: 'umd',
            umdNamedDefine: true
        },
        environment: {
            arrowFunction: false, // 关闭webpack的箭头函数，可选
        },
    },

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    // 配置webpack的loader
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                },
                exclude: /node_modules/,
            },
        ],
    },

    // 配置webpack的插件
    // plugins: [
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         template: "./build/index.html",
    //     }),
    // ],
};