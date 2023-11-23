const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const fs = require('fs')
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
console.log(nodeModules)
module.exports = {
    entry: './bin/www',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: "node",
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'server'),
    },
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: "data", to: "data" },
                { from: "dist", to: "dist" },
            ],
        }),

    ],
    externals: [nodeModules]
    // externals: ['pg-hstore'],
};
