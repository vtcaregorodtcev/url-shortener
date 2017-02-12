var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV;

module.exports = {
    context: path.join(__dirname, './public/app'),
    entry: './app.module.js',
    output: {
        path: path.join(__dirname, './public/build'),
        filename: 'app.bundle.js'
    },
    devtool: env !== 'production' ? 'inline-source-map' : false,
    watch: env !== 'production',
    module: {
        loaders: [{
            test: /\.postcss$/,
            loader: "style!css!postcss"
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff)/,
            loader: 'url'
        }, {
            test: /\.html$/,
            loader: "html"
        }]
    },
    postcss: function() {
        return [
            require('precss'),
            require('postcss-import'),
            require('postcss-simple-vars'),
            require('postcss-nested'),
            require('postcss-mixins'),
            require('autoprefixer')({
                browsers: ['last 2 versions', '> 2%']
            })
        ];
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            process: {
                env: {
                    BASE_API: JSON.stringify('/api/v1')
                }
            }
        })
    ].concat(env === 'production' ? new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }) : [])
};