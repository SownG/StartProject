var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
    // or devtool: 'eval' to debug issues with compiled output:
    /* devtool: 'cheap-module-eval-source-map',*/
    devtool: 'eval',
    entry: [
        // necessary for hot reloading with IE:
        'eventsource-polyfill',
        // listen to code updates emitted by hot middleware:
        'webpack-hot-middleware/client',
        // source code:
        './src/routes.jsx'
    ],
    output: {
        chunkFilename: '[id].chunk.js',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ])
    ],
    module: {
        noParse: [],
        loaders: [{
            test: /\.(js|jsx)?$/,
            loaders: [
                'babel-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.(js|jsx)?$/,
            loaders: [
                'babel'
            ],
            include: path.join(__dirname, 'src')
        }, 
        {
            test: /\.(less|css)$/,
            exclude: /\b(some\-css\-framework|whatever)\b/i,
            loader: "style!css!less"
        }],

    },
    resolve: {
        root: [path.join(__dirname, "bower_components"), path.join(__dirname, "./src")],
        alias: {},
        extensions: ['', '.json', '.js', '.jsx']
    },
};

module.exports = webpackConfig;
