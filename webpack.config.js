const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProvidePlugin = require("webpack-provide-global-plugin");

// Main const
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }, {
                test: /\.(png|jpg|gif|ico|webmanifest|xml)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {

                }
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },{
                test: /\.css$/,
                use: ['style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }]
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/static`, to: '' },
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`
        }),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};