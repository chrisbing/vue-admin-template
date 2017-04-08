/* eslint-disable no-undef */
/**
 * Created by xujian1 on 2017/4/7.
 */

var HtmlWebpackPlugin = require('html-webpack-plugin')
var Clean = require('clean-webpack-plugin')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')


function resolve(file) {
    return path.join(__dirname, file)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: resolve('dist'),
        // publicPath: "",
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src')],
                options: {
                    // fix: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: ['css-loader?root=./css!sass-loader!postcss-loader']
                        }),
                        css: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: ['css-loader?root=./css!postcss-loader']
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?root=./css!postcss-loader']
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?root=./css!sass-loader!postcss-loader']
                })
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: "file-loader", query: {name: "[name].[hash].[ext]"}},
        ]
    },
    resolve: {
        modules: [
            __dirname,
            "node_modules"
        ],
        alias: {
            'store': resolve('src/vuex/store')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            MOCK: false,
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
            DEBUG: process.env.NODE_ENV === 'dev'
        }),
        new Clean(['dist']),
        new ExtractTextPlugin("styles.[hash].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            hash: false
        })
    ]
}



