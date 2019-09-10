const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:{
        main:'./src/main.js'
    },
    mode:'development',
    output:{
        filename:'[name]-bundle.js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/' // when we want to specify assets and files, this is the path we point to. see dist/index.html script tag src for more details.

    },
    devServer:{
        contentBase: 'dist', // when we run webpack dev server, everything will be served from dist.
        overlay:true, // syntax errors will be visible on the browser screen
        hot:true,
        // stats:{
            // color:true
        // }
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
                        loader:"style-loader"
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test:/\.html$/,
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
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({ // this plugin automatically inject script tag inside our html. if you want to disable this: (inject:false)
            template: "./src/index.html",
            // inject: false
        })
    ]
}
