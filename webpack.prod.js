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
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    plugins: [
        new htmlwebpackplugin({
            template: './templete.html',
            filename: 'index/index.html',
            chunks: ['index'],
            title: 'blog'
        }),
        new htmlwebpackplugin({
            template: './templete.html',
            filename: 'login/index.html',
            chunks: ['login','rem'],
            title: 'login'
        }),
        new htmlwebpackplugin({
            template: './templete.html',
            filename: 'backend/index.html',
            chunks: ['backend'],
            title: '后台管理'
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