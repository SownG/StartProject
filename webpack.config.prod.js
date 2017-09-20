var path = require('path');
var webpack = require('webpack');

const paths = {
    output: 'dist',
    source: './src/',
    vendor: './assets/vendor/',
    css: './assets/stylesheets/'
}

module.exports = {
    devtool: 'source-map',
    entry: {
        'main': [
            paths.source + 'routes.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, paths.output),
        filename: 'bundle-[name].jsx',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ]),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },

            beautify: false,

            comments: false,
        })
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
