const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge');

module.exports = env => {
    const basic = {
        entry: ['./src/open.js',],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        mode: env.NODE_ENV,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            compress: false,
            port: 8080,
            open: true,
            hot: true
        }
    }
    if(env.NODE_ENV == 'production') {
        return merge(basic,{
            plugins: [
                new CleanWebpackPlugin(path.join(__dirname, 'dist'), {})
            ]
        })
    }
    if (env.NODE_ENV == 'development') {
        return merge(basic,{
            entry: ['./lodash-4.17.11.js'],
        })
    }
}