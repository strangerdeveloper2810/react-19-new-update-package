'use strict';


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'), // Đường dẫn file entry
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        clean: true, // Xóa file cũ khi build
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            transform: {
                                react: {
                                    runtime: "automatic"
                                }
                            }
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: { icon: true },
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[hash].[ext]',
                        },
                    },
                ],
            }

        ],
    },
    cache: {
        type: 'filesystem', // 🔥 Lưu cache vào ổ đĩa để build lại nhanh hơn
        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack'),
        buildDependencies: {
            config: [__filename], // Cache thay đổi khi cấu hình Webpack thay đổi
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ],
};
