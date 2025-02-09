'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        publicPath: '/', // ✅ Đảm bảo đường dẫn đúng khi deploy
        clean: true, // 🔥 Xóa file cũ trong build để tránh lỗi
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        drop_console: true, // 🔥 Loại bỏ console.log
                        drop_debugger: true,
                        passes: 3, // ✅ Tối ưu nhiều vòng để giảm size
                    },
                    output: {
                        comments: false, // ✅ Xóa comment
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all', // ✅ Tách tất cả code có thể
            maxSize: 200000, // 🔥 Giới hạn mỗi file 200KB
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single', // ✅ Giúp trình duyệt cache hiệu quả hơn
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: true,
            scriptLoading: 'defer',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // ✅ Xuất file HTML thay vì chạy server
            openAnalyzer: false, // ✅ Không cần mở trình duyệt tự động
            reportFilename: 'bundle-report.html', // ✅ Đặt file trong `dist/`
            generateStatsFile: true, // 🔥 Xuất thêm file JSON để phân tích
            statsFilename: 'stats.json', // ✅ Đặt file JSON cùng thư mục build
        }),


    ],
});
