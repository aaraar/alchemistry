const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/images'
                    }
                  }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Alchemistry',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
           }),
        new CopyWebpackPlugin([{
            from:'./src/assets/images',
             to:'assets/images'
          }])
    ]
};