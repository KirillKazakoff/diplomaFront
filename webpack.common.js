const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

module.exports = {
    target: 'web',
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    devServer: {
        port: 9001,
        contentBase: './',
        watchContentBase: true,
        publicPath: '/dist/',
        clientLogLevel: 'silent',
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|ttf|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'img/',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            path: require.resolve('path-browserify'),
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new PurgecssPlugin({
        //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        // }),

        new CopyPlugin({
            patterns: [
                { from: 'src/img/srcImg', to: 'img' },
                { from: 'node_modules/libvorbis.js/js/libvorbis.min.js', to: 'worker' },
                { from: 'node_modules/jszip/dist/jszip.js', to: 'worker' },
                {
                    from: 'node_modules/lamejs/worker-example/worker-realtime.js',
                    to: 'worker',
                },
                { from: 'src/app/upload/zip/zip-worker.js', to: 'worker' },
                { from: 'src/app/service-worker/service-worker.js', to: './' },
            ],
        }),
    ],
};
