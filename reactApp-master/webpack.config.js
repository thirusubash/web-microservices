const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    // mode: 'development',
    mode: 'production',

    // <-- Check if this comma is correctly placed
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        usedExports: true, // Enable tree shaking
        minimize: true,    // Enable minification
        minimizer: [new TerserPlugin()],
    },
    entry: {
        index: './src/index.js',

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devtool: 'eval-source-map', // Enable source maps for better debugging
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        mainFields: ['browser', 'module', 'main'],
        alias: {
            '@api': path.resolve(__dirname, 'src/api/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@auth': path.resolve(__dirname, 'src/auth/'),
            '@cart': path.resolve(__dirname, 'src/cart/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            '@exception': path.resolve(__dirname, 'src/exception/'),
            '@redux': path.resolve(__dirname, 'src/redux/'),
            '@routes': path.resolve(__dirname, 'src/routes/'),
            '@styles': path.resolve(__dirname, 'src/assets/styles/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // Output directory for images in your build
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',// Use [name] to generate unique CSS file per entry point
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(), // Clean the 'dist' directory before each build
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/, // Compress JavaScript and CSS files
            filename: '[path][base].gz', // Output file name with .gz extension
        }),
        new Dotenv(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        client: {
            logging: 'verbose',
        },
        https: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public'),
        }, historyApiFallback: true,
    },
    stats: {
        errorDetails: true,
    },
};
