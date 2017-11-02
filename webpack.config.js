'use strict';

var path = require('path'),
    webpack = require('webpack'),
    htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {

    var DEV = env === 'dev', //启动开发环境
        QA = env === 'qa', //编译为测试环境
        PROD = env === 'prod'; //编译为生产环境

    var styleLoader = { //处理样式的loader配置
        style: {
            loader: 'style-loader',
            options: {
                attrs: {
                    class: DEV ? 'blob-stylesheet' : ''
                }
            }
        },
        css: {
            loader: 'css-loader',
            options: {
                minimize: QA || PROD,
                sourceMap: DEV || QA
            }
        },
        css_noMinimize: {
            loader: 'css-loader',
            options: {
                minimize: false,
                sourceMap: DEV || QA
            }
        },
        postcss: {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer')({
                        browsers: QA || PROD ? ['last 2 versions', 'ie >= 9'] : []
                    })
                ],
                sourceMap: DEV || QA
            }
        },
        sass: {
            loader: 'sass-loader',
            options: {
                sourceMap: DEV || QA
            }
        }
    };



    var M = {

        entry: { //打包入口
            'libs': './src/libs.js',
            'global': './src/global.js'
        },

        output: { //打包输出
            path: path.join(__dirname, './static/dist'),
            filename: 'scripts/[name].js' + (QA || PROD ? '?[chunkhash:8]' : ''),
            chunkFilename: 'scripts/chunks/[name].js' + (QA || PROD ? '?[chunkhash:8]' : ''),
            publicPath: '/'
        },

        plugins: [
            new htmlWebpackPlugin({ //应用入口html
                template: './src/entry.html',
                favicon: './src/global/images/wz_favicon.ico',
                filename: 'index.html',
                inject: false,
                minify: {
                    removeComments: QA || PROD,
                    collapseWhitespace: QA || PROD
                }
            })
        ],

        module: {
            rules: [

                { //.ejs
                    test: /\.ejs$/i,
                    use: [{
                        loader: 'ejs-loader',
                        query: {
                            interpolate: '\\{\\{(.+?)\\}\\}',
                            evaluate: '\\[\\[(.+?)\\]\\]'
                        }
                    }]
                },

                { //.css 框架或外部插件的样式
                    test: /\.css$/i,
                    use: [styleLoader.style, styleLoader.css_noMinimize],
                    include: [path.join(__dirname, './src/libs'), path.join(__dirname, './src/plugins')]
                },

                { //.scss
                    test: /\.scss$/i,
                    use: [styleLoader.style, styleLoader.css, styleLoader.postcss, styleLoader.sass]
                },

                { //url
                    test: /\.(gif|png|jpg|jpeg|svg)$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //转base64阀值
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }]
                },

                { //jshint
                    test: /\.js$/i,
                    use: [{
                        loader: "jshint-loader"
                    }],
                    exclude: [path.join(__dirname, './node_modules'), path.join(__dirname, './src/libs'), path.join(__dirname, './src/plugins')]
                },

                {
                    test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                    use:[{
                        loader: 'file-loader'
                    }]
                }

            ]
        }
    };



    if (QA || PROD) { //压缩js
        M.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: PROD,
                    drop_debugger: true
                }
            })
        );
    }



    if (DEV || QA) { //生成映射
        M.devtool = QA ? 'source-map' : 'eval';
    }



    if (DEV) {
        M.devServer = { //前端资源服务
            contentBase: './static/dist',
            port: 9876,
            proxy: {
                '/api': {
                    target: 'http://localhost:3660',
                    secure: false,
                    ws:true
                }
            }
        };
    }



    return M;
};