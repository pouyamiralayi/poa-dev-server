const path = require('path')
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
                    {
                        loader:"file-loader",
                        options: {
                            name: '[name].html' // the file created comes with this name
                        }
                    },
                    {
                        loader:'extract-loader' // do not bundle this and treat this as a separate file
                    },
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
    }
}
