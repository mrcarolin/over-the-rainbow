var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
                loader: 'babel' // The module to load. "babel" is short for "babel-loader"
            }

        ],
        postLoaders: [
            { loader: "transform?brfs" }
        ]
    }
};