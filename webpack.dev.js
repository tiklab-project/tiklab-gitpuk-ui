const webpack = require('webpack');
const {merge} =require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MonacoLocalesPlugin = require('monaco-editor-locales-plugin');
const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require('./environment/environment_' + customEnv);

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:'development',
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: 'assets/js/[name].[hash].js',
        chunkFilename:'[name][chunkhash].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'GitTok',
            template: path.resolve(__dirname, './public/index.template.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({ENV:JSON.stringify(customEnv), ...webpackGlobal}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
        new MonacoWebpackPlugin({
            languages:['json']
        }),
        new MonacoLocalesPlugin({
            //设置支持的语言
            languages: ["es", "zh-cn"],
            //默认语言
            defaultLanguage: "zh-cn",
            //打印不匹配的文本
            logUnmatched: false,
            //自定义文本翻译
            mapLanguages: { "zh-cn": { "Copy changed line": "复制更改的行"} }
        }),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn|es/,
        ),
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        contentBase: path.join(__dirname, 'plugin'),
        hot:true,
        compress:true,
        port:3020,
        host: '0.0.0.0',
        historyApiFallback: true,
        disableHostCheck: true,
    }
});

