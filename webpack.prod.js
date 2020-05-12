const webpack = require('webpack');
const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mimicssextractplugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js',
        backend: './src/backend.js',
        rem: './src/rem.js'
    },
    output: {
        filename: '[name]/[name].js',
        path: __dirname + '/dist'
    },
    mode: 'production',
    module: {
        rules:[
            {
                test: /\.(scss|css)$/,
                use: [
                    mimicssextractplugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },{
                test: /\.(jpg|jpeg)$/,              
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images'
                }               
            }
        ]
    },
    plugins: [
        new htmlwebpackplugin({
            title: 'MyBlog',
            base: 'http://www.feelingwilling.club/index/',
            template: './templete.html',
            filename: 'index/index.html',
            chunks: ['index']
        }),
        new htmlwebpackplugin({
            title: '登录',
            base: 'http://www.feelingwilling.club/login/',
            template: './templete.html',
            filename: 'login/index.html',
            chunks: ['login','rem']
        }),
        new htmlwebpackplugin({
            title: 'Blog管理',         
            base: 'http://www.feelingwilling.club/backend/',
            template: './templete.html',
            filename: 'backend/index.html',
            chunks: ['backend']
        }),
        new CleanWebpackPlugin(),
        new mimicssextractplugin({
            filename: '[name]/[name].css'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
    }
}