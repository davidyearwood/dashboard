const path = require('path');

module.exports = {
    entry: { 
        admin: './src/index.js', 
        signup: './src/signup_index.js'
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/, 
            use: [
                {loader: "style-loader"}, 
                {loader: "css-loader"}
            ]
        }]
    }
};