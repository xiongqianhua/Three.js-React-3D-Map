const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const {
//     BundleAnalyzerPlugin
// } = require('webpack-bundle-analyzer');
module.exports = {
    entry: {
        app: "./src/index.jsx"
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "./dist"),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: [{
                  loader: 'worker-loader',
                },
                { loader: 'babel-loader',
                    options:{
                       cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "./src"),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/transform-runtime', '@babel/plugin-proposal-class-properties'],
                        cacheDirectory: true
                    }
                },]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                exclude: /(node_modules)/,
                type: 'asset/resource',
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'assets/[name].[ext]',
                      },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                exclude: /(node_modules)/,
                type: 'asset/inline',
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'assets/[name].[ext]',
                      },
                    },
                ],
            },
            {
                test: /\.(css)$/,
                exclude: /(node_modules)/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: ["",".js", ".jsx",".css"],
        alias: {
          "@": require("path").resolve(__dirname, "./src"),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),      
        new HtmlWebpackPlugin({
            title: "flasebase-map-track-view",
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true, 
                removeAttributeQuotes: true, 
                removeEmptyAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeTagWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),     
    ],
}