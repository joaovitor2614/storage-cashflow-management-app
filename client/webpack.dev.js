const path = require('path')
const common = require("./webpack.common")
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    "style-loader", //3_ injeta styles no dom
                    "css-loader", //2_transformar css em commonjs
                    "sass-loader" // 1_transformar scss em css
                ]
            }
        ]
    },
    plugins: [
        new Dotenv()
    ],
    devtool: 'eval-cheap-module-source-map',
    

})
