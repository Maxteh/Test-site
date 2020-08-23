const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const optimization = () => {
    const config = {}

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

const cssLoaders = extra => {
    loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true,
        }
    },
         'css-loader',
        {
         loader: 'postcss-loader',
         options: {
            config: { path: './src/js/postcss.config.js' }
         }
       },
    ];

    if(extra) {
       loaders.push(extra);
    }

    return loaders
}

const fileLoaders = folder => {
    loaders = [{
        loader: 'file-loader',
        options: {
            publicPath: 'assets/' + folder,
            outputPath: 'assets/' + folder,
        }
    },];

    return loaders
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 8000,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './html/index.hbs',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'page2.html',
            template: './html/page2.hbs',
            chunks: ['main'],
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'page3.html',
            template: './html/page3.hbs',
            chunks: ['main'],
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'page4.html',
            template: './html/page4.hbs',
            chunks: ['main'],
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: fileLoaders('images')
            },
            {
                test: /\.ttf$/,
                use: fileLoaders('fonts')
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    }
}