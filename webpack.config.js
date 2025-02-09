'use strict';



// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const ReactFastRefresh = require('@pmmmwh/react-refresh-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const paths = require('./paths');
// const getClientEnvironment = require('./env');

// module.exports = function (webpackEnv) {
//   const isEnvDevelopment = webpackEnv === 'development';
//   const isEnvProduction = webpackEnv === 'production';

//   const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

//   return {
//     target: ['browserslist'],
//     stats: 'errors-warnings',
//     mode: isEnvProduction ? 'production' : 'development',
//     bail: isEnvProduction,
//     devtool: isEnvDevelopment ? 'eval-cheap-module-source-map' : false,
//     entry: paths.appIndexJs,
//     output: {
//       path: paths.appBuild,
//       filename: isEnvProduction
//         ? 'static/js/[name].[contenthash:8].js'
//         : 'static/js/[name].js',
//       chunkFilename: isEnvProduction
//         ? 'static/js/[name].[contenthash:8].chunk.js'
//         : 'static/js/[name].chunk.js',
//       assetModuleFilename: 'static/media/[name].[hash][ext]',
//       publicPath: paths.publicUrlOrPath,
//       clean: true,
//     },
//     cache: {
//       type: 'filesystem',
//       cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack'),
//       compression: 'gzip',
//     },
//     optimization: {
//       minimize: isEnvProduction,
//       minimizer: [
//         new TerserPlugin({
//           terserOptions: {
//             parse: { ecma: 8 },
//             compress: {
//               drop_console: true,
//               drop_debugger: true,
//               passes: 3,
//               dead_code: true,
//               reduce_vars: true,
//               unsafe: true,
//             },
//             output: { ecma: 5, comments: false, ascii_only: true },
//           },
//         }),
//         new CssMinimizerPlugin({
//           minimizerOptions: {
//             preset: [
//               'default',
//               {
//                 discardComments: { removeAll: true },
//                 normalizeWhitespace: true,
//               },
//             ],
//           },
//         }),
//       ],
//       splitChunks: {
//         chunks: 'all',
//         minSize: 20 * 1024,
//         maxSize: 300 * 1024,
//         cacheGroups: {
//           vendor: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             chunks: 'all',
//           },
//           commons: {
//             test: /[\\/]src[\\/]/,
//             name: 'commons',
//             chunks: 'all',
//           },
//         },
//       },
//       usedExports: true, // ✅ Bật Tree-shaking
//       minimize: true,
//       sideEffects: false, // ✅ Loại bỏ code không dùng trong package
//       runtimeChunk: 'single',
//       concatenateModules: true,
//     },
//     resolve: {
//       modules: ['node_modules'],
//       alias: {
//         'react': path.resolve(__dirname, '../node_modules/react'),
//         'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
//       },
//       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(js|mjs|jsx|ts|tsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'swc-loader',
//           },
//         },
//         {
//           test: /\.css$/,
//           use: [
//             isEnvDevelopment && 'style-loader',
//             isEnvProduction && MiniCssExtractPlugin.loader,
//             'css-loader',
//             'postcss-loader',
//           ].filter(Boolean),
//           sideEffects: true,
//         },
//         {
//           test: /\.(scss|sass)$/,
//           use: [
//             isEnvDevelopment && 'style-loader',
//             isEnvProduction && MiniCssExtractPlugin.loader,
//             'css-loader',
//             'postcss-loader',
//             'sass-loader',
//           ].filter(Boolean),
//           sideEffects: true,
//         },
//         {
//           test: /\.(png|jpe?g|gif|svg|webp)$/,
//           type: 'asset',
//           parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
//         },
//       ],
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         inject: true,
//         template: paths.appHtml,
//         minify: isEnvProduction && {
//           removeComments: true,
//           collapseWhitespace: true,
//           removeRedundantAttributes: true,
//           useShortDoctype: true,
//           removeEmptyAttributes: true,
//           removeStyleLinkTypeAttributes: true,
//           keepClosingSlash: true,
//           minifyJS: true,
//           minifyCSS: true,
//           minifyURLs: true,
//         },
//       }),
//       isEnvDevelopment && new ReactFastRefresh(),
//       isEnvProduction &&
//       new BundleAnalyzerPlugin({
//         analyzerMode: 'static', // Xuất ra file HTML
//         openAnalyzer: true, // Tự động mở trình duyệt khi build
//         reportFilename: 'bundle-report.html', // File báo cáo
//       }),
//       new MiniCssExtractPlugin({
//         filename: 'static/css/[name].[contenthash:8].css',
//         chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
//       }),
//       new WebpackManifestPlugin({
//         fileName: 'asset-manifest.json',
//         publicPath: paths.publicUrlOrPath,
//       }),
//       isEnvProduction &&
//       new CompressionPlugin({
//         filename: '[path][base].gz',
//         algorithm: 'gzip',
//         test: /\.(js|css|html|svg)$/,
//         threshold: 10240,
//         minRatio: 0.8,
//       }),
//       isEnvProduction &&
//       new CompressionPlugin({
//         filename: '[path][base].br',
//         algorithm: 'brotliCompress',
//         test: /\.(js|css|html|svg)$/,
//         threshold: 10240,
//         minRatio: 0.8,
//       }),
//       new webpack.DefinePlugin(env.stringified),
//     ].filter(Boolean),
//     performance: false,
//   };
// };

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  module.exports = require('./config/webpack.prod');
} else {
  module.exports = require('./config/webpack.dev');
}

