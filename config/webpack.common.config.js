const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist/static'),
        filename: '[name].js'
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
                      outputPath: 'static/assets/images'
                    }
                  }
                ]
            },
            { 
                test: /\.handlebars$/,
                loader: "handlebars-loader",
                options: {
                    outputPath: 'view/'
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
          }),
        new HtmlWebpackPlugin({
            title: 'Alchemistry',
            template: './src/view/index.handlebars',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            to: 'static',
            filename: 'style.css'
           }),
        new CopyWebpackPlugin([{
            from:'./src/assets/images',
             to:'assets/images'
          }]),
        new CopyWebpackPlugin([{
        from:'./src/view',
        to:'../view'
        }])
    ]
};