const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/template.html'
        })
    ],
    module: {
        rules: [

            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        outputPath: "imgs"
                    }

                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    devServer: {

        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000',
          }
    }
};

