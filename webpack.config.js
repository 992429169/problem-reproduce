const path = require('path');
const os = require('os');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

getCpuCoresNum = () => {
    return os.cpus()?.length || 1;
};

getThreadLoader = ({ workersRatio = 1 / 3, ...otherOptions } = {}) => {
    return {
        loader: 'thread-loader',
        options: {
            workers: Math.max(Math.round(getCpuCoresNum() * workersRatio) - 1, 1),
            ...otherOptions,
        },
    };
};

const threadLoader = getThreadLoader({ workersRatio: 2 / 3 });

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            logger: console, // HACK
        },
    },
};

const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        getThreadLoader({ workersRatio: 2 / 3 }),
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]-[hash:base64:5]',
                },
                importLoaders: 2,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['postcss-preset-env'],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.less$/,
                use: getStyleLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders(sassLoader),
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[hash:8][ext][query]',
                },
            },
            {
                test: /\.(ttf|woff2?|map4|map3|avi)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'media/[hash:8][ext][query]',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    mode: 'production',
    resolveLoader: {
        modules: ['node_modules', './loaders'],
    },
    optimization: {
        splitChunks: {
            minChunks: 2,
            chunks: 'all',
            cacheGroups: {
                common: {
                    name: `common`,
                    test: /[\\/]src[\\/]Common/,
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: 'react_webpack_runtime',
        },
    },
    devServer: {
        static: './dist',
        open: true,
        port: 3010,
    },
};
