const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const isProd = process.env.NODE_ENV === "production"

module.exports = {
    entry:{
        main:[
            './src/main.js']
    },
    mode: "production",
    output:{
        filename:'[name]-bundle.js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/' // when we want to specify assets and files, this is the path we point to.

    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test:/\.html$/, // we keep this loader, because we are requiring index.html to be part of HMR.
                use:[
                    // we omit file-loader and extract-loader because the HTMLWebpackPlugin is doing the job for us.
                    // {
                    //     loader:"file-loader",
                    //     options: {
                    //         name: '[name].html' // the file created comes with this name
                    //     }
                    // },
                    // {
                    //     loader:'extract-loader' // do not bundle this and treat this as a separate file
                    // },
                    {
                        loader:'html-loader'
                    }
                ]
            },
            {
                test:/\.(jpg|gif|png)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name: 'images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        new MiniCSSExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),
        new HTMLWebpackPlugin({ // this plugin automatically inject script tag inside our html. if you want to disable this: (inject:false)
            template: "./src/index.html",
            // inject: false
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new UglifyPlugin,
        // new MinifyPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip'
        }),
        new BrotliPlugin()
    ]
}
